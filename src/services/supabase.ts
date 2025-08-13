import { supabase } from '../lib/supabase';
import type { 
  Project, 
  Template, 
  Version, 
  TemplatePlan, 
  TemplateEdit, 
  CompileResult, 
  LintResult, 
  EditOperation 
} from '../types';

class SupabaseService {
  // Helper method to get current user
  private async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      throw new Error('User not authenticated');
    }
    return user;
  }

  // Project operations
  async createProject(name: string, brandTokens: any): Promise<Project> {
    const user = await this.getCurrentUser();
    
    const { data, error } = await supabase
      .from('projects')
      .insert([{ name, brand_tokens: brandTokens, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getProjects(): Promise<Project[]> {
    const user = await this.getCurrentUser();
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getProject(id: string): Promise<Project | null> {
    const user = await this.getCurrentUser();
    
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  // Template operations
  async getTemplates(projectId: string): Promise<Template[]> {
    const user = await this.getCurrentUser();
    
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getTemplate(id: string): Promise<Template | null> {
    const user = await this.getCurrentUser();
    
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  // Version operations
  async getVersions(templateId: string): Promise<Version[]> {
    // Verify user owns the template first
    const template = await this.getTemplate(templateId);
    if (!template) {
      throw new Error('Template not found or access denied');
    }
    
    const { data, error } = await supabase
      .from('versions')
      .select('*')
      .eq('template_id', templateId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getVersion(id: string): Promise<Version | null> {
    const { data, error } = await supabase
      .from('versions')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    
    // Verify user owns the template for this version
    if (data) {
      const template = await this.getTemplate(data.template_id);
      if (!template) {
        throw new Error('Access denied');
      }
    }
    
    return data;
  }

  async getLatestVersion(templateId: string): Promise<Version | null> {
    // Verify user owns the template first
    const template = await this.getTemplate(templateId);
    if (!template) {
      throw new Error('Template not found or access denied');
    }
    
    const { data, error } = await supabase
      .from('versions')
      .select('*')
      .eq('template_id', templateId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  // API functions
  async planTemplate(data: {
    projectId: string;
    emailType: string;
    subject?: string;
    tone?: string;
    prompt: string;
    brandTokens?: any;
  }): Promise<TemplatePlan> {
    const user = await this.getCurrentUser();
    
    // Verify user owns the project
    const project = await this.getProject(data.projectId);
    if (!project) {
      throw new Error('Project not found or access denied');
    }
    
    const { data: result, error } = await supabase.functions.invoke('plan', {
      body: { ...data, userId: user.id }
    });

    if (error) throw error;
    return result.data;
  }

  async editTemplate(data: {
    templateId: string;
    ops: EditOperation[];
    prompt?: string;
  }): Promise<TemplateEdit> {
    const user = await this.getCurrentUser();
    
    // Verify user owns the template
    const template = await this.getTemplate(data.templateId);
    if (!template) {
      throw new Error('Template not found or access denied');
    }
    
    const { data: result, error } = await supabase.functions.invoke('edit', {
      body: { ...data, userId: user.id }
    });

    if (error) throw error;
    return result.data;
  }

  async compileTemplate(mjml: string): Promise<CompileResult> {
    await this.getCurrentUser(); // Ensure user is authenticated
    
    const { data: result, error } = await supabase.functions.invoke('compile', {
      body: { mjml }
    });

    if (error) throw error;
    return result.data;
  }

  async lintTemplate(mjml: string, html?: string): Promise<LintResult> {
    await this.getCurrentUser(); // Ensure user is authenticated
    
    const { data: result, error } = await supabase.functions.invoke('lint', {
      body: { mjml, html }
    });

    if (error) throw error;
    return result.data;
  }

  async saveTemplate(data: {
    projectId: string;
    templateName: string;
    templateType?: string;
    irJson: TemplatePlan;
    mjml: string;
    html: string;
  }): Promise<{ templateId: string; versionId: string }> {
    const user = await this.getCurrentUser();
    
    // Verify user owns the project
    const project = await this.getProject(data.projectId);
    if (!project) {
      throw new Error('Project not found or access denied');
    }
    
    const { data: result, error } = await supabase.functions.invoke('save-template', {
      body: { ...data, userId: user.id }
    });

    if (error) throw error;
    return result.data;
  }
}

export const supabaseService = new SupabaseService();