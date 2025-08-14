-- Brand extraction tracking table for detailed logging and analytics
CREATE TABLE brand_extractions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    url VARCHAR(2048) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
    
    -- Extraction metadata
    extraction_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    extraction_completed_at TIMESTAMP WITH TIME ZONE,
    extraction_duration_ms INTEGER,
    
    -- Raw data from Firecrawl API
    firecrawl_response JSONB,
    screenshots JSONB, -- {"desktop": "base64", "mobile": "base64"}
    page_content TEXT,
    page_metadata JSONB,
    
    -- Analyzed brand data
    extracted_colors JSONB, -- Color palette analysis results
    extracted_logo JSONB,   -- Logo detection results
    extracted_content JSONB, -- Brand messaging and content
    
    -- AI analysis metadata
    ai_analysis_metadata JSONB, -- Model versions, confidence scores, etc.
    
    -- Error handling
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_brand_extractions_project_id ON brand_extractions(project_id);
CREATE INDEX idx_brand_extractions_status ON brand_extractions(status);
CREATE INDEX idx_brand_extractions_url ON brand_extractions(url);
CREATE INDEX idx_brand_extractions_created_at ON brand_extractions(created_at);

-- RLS policies (Row Level Security)
ALTER TABLE brand_extractions ENABLE ROW LEVEL SECURITY;

-- Users can only access brand extractions for their own projects
CREATE POLICY "Users can view their own brand extractions" 
ON brand_extractions FOR SELECT 
USING (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
));

CREATE POLICY "Users can insert brand extractions for their own projects" 
ON brand_extractions FOR INSERT 
WITH CHECK (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
));

CREATE POLICY "Users can update their own brand extractions" 
ON brand_extractions FOR UPDATE 
USING (project_id IN (
    SELECT id FROM projects WHERE user_id = auth.uid()
));

COMMENT ON TABLE brand_extractions IS 'Detailed tracking and storage of brand extraction processes with raw data, analysis results, and metadata';