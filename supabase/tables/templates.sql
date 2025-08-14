CREATE TABLE templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    latest_version_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);