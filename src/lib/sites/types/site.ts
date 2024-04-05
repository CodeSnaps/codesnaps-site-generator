interface Site {
  id: string;
  organization_id: number;
  page_description: string;
  color_scheme: string;
  structure: JSON;
  created_at: Date;
  site_schema: string;
  project_name: string;
}

export default Site;
