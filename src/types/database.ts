export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          name: string;
          brand_tokens: any;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          brand_tokens: any;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          brand_tokens?: any;
          user_id?: string;
          created_at?: string;
        };
      };
      templates: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          type: string;
          user_id: string;
          latest_version_id?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          type: string;
          user_id: string;
          latest_version_id?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          type?: string;
          user_id?: string;
          latest_version_id?: string;
          created_at?: string;
        };
      };
      versions: {
        Row: {
          id: string;
          template_id: string;
          ir_json: any;
          mjml: string;
          html: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          template_id: string;
          ir_json: any;
          mjml: string;
          html: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          template_id?: string;
          ir_json?: any;
          mjml?: string;
          html?: string;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}