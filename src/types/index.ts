// Database types
export interface Project {
  id: string;
  name: string;
  brand_tokens: BrandTokens;
  user_id: string;
  created_at: string;
}

export interface Template {
  id: string;
  project_id: string;
  name: string;
  type: string;
  user_id: string;
  latest_version_id?: string;
  created_at: string;
}

export interface Version {
  id: string;
  template_id: string;
  ir_json: TemplatePlan;
  mjml: string;
  html: string;
  created_at: string;
}

// Brand configuration
export interface BrandTokens {
  primary: string;
  secondary: string;
  text: string;
  background: string;
  fontStack: string;
  radius: number;
  logoLight?: string;
  logoDark?: string;
}

// LLM Response Schemas
export interface TemplatePlan {
  meta: {
    emailType: string;
    subject: string;
    preheader: string;
    tone: string;
  };
  brand: BrandTokens;
  sections: TemplateSection[];
  mjml: string;
}

export interface TemplateSection {
  id: string;
  type: 'header' | 'hero' | 'content' | 'products' | 'footer' | 'testimonial' | 'cta';
  props: Record<string, any>;
}

export interface TemplateEdit {
  targetTemplateId: string;
  ops: EditOperation[];
  mjml: string;
  notes: string;
}

export interface EditOperation {
  op: 'update-attr' | 'update-style' | 'replace-text' | 'insert-after' | 'insert-before' | 'remove' | 'replace-node' | 'reorder' | 'apply-theme';
  targetId: string;
  path?: string;
  value?: string;
  nodeMjml?: string;
}

// API response types
export interface CompileResult {
  html: string;
  size: number;
  warnings: string[];
}

export interface LintResult {
  errors: LintIssue[];
  warnings: LintIssue[];
  suggestions: LintIssue[];
  accessibility: {
    altTextCoverage: number;
    contrastIssues: ContrastIssue[];
    headingStructure: HeadingIssue[];
  };
  performance: {
    sizeKB: number;
    sizeGrade: string;
    imageOptimization: string[];
  };
  deliverability: {
    hasUnsubscribe: boolean;
    inlineStyles: boolean;
    issues: string[];
  };
}

export interface LintIssue {
  type: string;
  message: string;
  location?: string;
  fix?: string;
}

export interface ContrastIssue {
  element: string;
  ratio: number;
  recommendation: string;
}

export interface HeadingIssue {
  issue: string;
  recommendation: string;
}

// UI state types
export interface EditorState {
  currentProject?: Project;
  currentTemplate?: Template;
  currentVersion?: Version;
  compiledHtml?: string;
  lintResults?: LintResult;
  isLoading: boolean;
  error?: string;
  previewMode: 'desktop' | 'mobile';
  isDarkMode: boolean;
  showMjmlSource: boolean;
}

// Quick edit types
export interface QuickEditAction {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: 'layout' | 'style' | 'content';
  operations: EditOperation[];
}

export interface CustomizationOption {
  id: string;
  label: string;
  type: 'color' | 'text' | 'number' | 'select' | 'image';
  value: any;
  options?: { label: string; value: any }[];
  min?: number;
  max?: number;
  step?: number;
}