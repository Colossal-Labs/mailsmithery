Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        // Extract parameters from request body
        const requestData = await req.json();
        const { projectId, url } = requestData;

        if (!projectId || !url) {
            throw new Error('Project ID and URL are required');
        }

        // Get environment variables
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');

        if (!supabaseUrl || !supabaseServiceKey || !firecrawlApiKey) {
            const missing = [];
            if (!supabaseUrl) missing.push('SUPABASE_URL');
            if (!supabaseServiceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');
            if (!firecrawlApiKey) missing.push('FIRECRAWL_API_KEY');
            throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
        }

        // Verify project exists using service role key (correct pattern)
        const projectResponse = await fetch(`${supabaseUrl}/rest/v1/projects?id=eq.${projectId}&select=id,user_id,name`, {
            headers: {
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'apikey': supabaseServiceKey,
                'Content-Type': 'application/json'
            }
        });

        if (!projectResponse.ok) {
            const errorText = await projectResponse.text();
            throw new Error(`Failed to verify project: ${errorText}`);
        }

        const projects = await projectResponse.json();
        if (!projects || projects.length === 0) {
            throw new Error('Project not found');
        }

        // Create brand extraction record
        const extractionId = crypto.randomUUID();
        const startTime = new Date();
        
        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/brand_extractions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'apikey': supabaseServiceKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                id: extractionId,
                project_id: projectId,
                url: url,
                status: 'processing',
                extraction_started_at: startTime.toISOString()
            })
        });

        if (!insertResponse.ok) {
            const error = await insertResponse.text();
            throw new Error(`Failed to create extraction record: ${error}`);
        }

        // Scrape website with Firecrawl API
        const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${firecrawlApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                onlyMainContent: false,
                mobile: false,
                includeTags: ['title', 'meta', 'h1', 'h2', 'h3', 'img', 'a', 'p', 'div', 'nav', 'header', 'footer'],
                waitFor: 3000,
                removeBase64Images: false,
                blockAds: true,
                timeout: 30000,
                actions: [
                    {
                        type: 'screenshot'
                    }
                ]
            })
        });

        if (!firecrawlResponse.ok) {
            const errorText = await firecrawlResponse.text();
            throw new Error(`Firecrawl API error: ${errorText}`);
        }

        const firecrawlData = await firecrawlResponse.json();
        
        if (!firecrawlData.success) {
            throw new Error(`Firecrawl scraping failed: ${firecrawlData.error || 'Unknown error'}`);
        }

        // Extract metadata
        const pageMetadata = {
            title: firecrawlData.data.metadata?.title || '',
            description: firecrawlData.data.metadata?.description || '',
            keywords: firecrawlData.data.metadata?.keywords || '',
            ogTitle: firecrawlData.data.metadata?.ogTitle || '',
            ogDescription: firecrawlData.data.metadata?.ogDescription || '',
            ogImage: firecrawlData.data.metadata?.ogImage || '',
            domain: new URL(url).hostname
        };

        // Prepare screenshots data
        const screenshots = {
            desktop: firecrawlData.data.screenshot || '',
            mobile: '',
            actions: firecrawlData.data.actions?.screenshots || []
        };

        // Basic color extraction from content
        const extractedColors = await extractColorsFromContent(firecrawlData.data.html || '');
        
        // Basic content analysis
        const extractedContent = {
            brand: {
                name: pageMetadata.title,
                description: pageMetadata.description,
                domain: pageMetadata.domain
            },
            messaging: {
                tone: 'professional',
                style: 'modern',
                keywords: pageMetadata.keywords.split(',').map((k: string) => k.trim()).filter(Boolean)
            }
        };

        // Calculate processing duration
        const endTime = new Date();
        const duration = endTime.getTime() - startTime.getTime();

        // Update extraction record with results using service role key
        const updateResponse = await fetch(`${supabaseUrl}/rest/v1/brand_extractions?id=eq.${extractionId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'apikey': supabaseServiceKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: 'completed',
                extraction_completed_at: endTime.toISOString(),
                extraction_duration_ms: duration,
                firecrawl_response: firecrawlData,
                screenshots: screenshots,
                page_content: firecrawlData.data.markdown || '',
                page_metadata: pageMetadata,
                extracted_colors: extractedColors,
                extracted_content: extractedContent,
                ai_analysis_metadata: {
                    version: '1.0.0',
                    analyzed_at: endTime.toISOString(),
                    features: ['basic_color_extraction', 'metadata_analysis']
                }
            })
        });

        if (!updateResponse.ok) {
            const error = await updateResponse.text();
            console.error('Failed to update extraction record:', error);
        }

        // Update project brand_tokens using service role key
        const brandTokens = {
            extraction: {
                url: url,
                extractedAt: endTime.toISOString(),
                status: 'completed',
                metadata: pageMetadata
            },
            visual: {
                colors: extractedColors,
                screenshots: screenshots
            },
            content: extractedContent
        };

        const projectUpdateResponse = await fetch(`${supabaseUrl}/rest/v1/projects?id=eq.${projectId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'apikey': supabaseServiceKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                brand_tokens: brandTokens
            })
        });

        if (!projectUpdateResponse.ok) {
            const error = await projectUpdateResponse.text();
            console.error('Failed to update project brand tokens:', error);
        }

        // Return success response
        return new Response(JSON.stringify({
            data: {
                extractionId: extractionId,
                status: 'completed',
                duration: duration,
                brandTokens: brandTokens
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Brand extraction error:', error);

        const errorResponse = {
            error: {
                code: 'BRAND_EXTRACTION_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});

// Helper function to extract colors from HTML content
async function extractColorsFromContent(html: string): Promise<any> {
    const colors = {
        primary: '#1a73e8',
        secondary: '#34a853',
        accent: '#fbbc04',
        palette: [] as string[]
    };

    // Basic regex-based color extraction
    const colorRegex = /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d\.]+\s*\)/g;
    const foundColors = html.match(colorRegex);
    
    if (foundColors) {
        // Remove duplicates and limit to most common colors
        const uniqueColors = [...new Set(foundColors)].slice(0, 10);
        colors.palette = uniqueColors;
        
        // Set primary color as the first found color
        if (uniqueColors.length > 0) {
            colors.primary = uniqueColors[0];
        }
        if (uniqueColors.length > 1) {
            colors.secondary = uniqueColors[1];
        }
        if (uniqueColors.length > 2) {
            colors.accent = uniqueColors[2];
        }
    }
    
    return colors;
}