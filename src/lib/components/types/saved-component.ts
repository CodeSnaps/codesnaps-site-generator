interface SavedComponent {
  id: string;
  created_at: Date;
  name: string;
  is_free: boolean;
  type: string;
  category: string;
  preview_url: string;
  image_src: string;
  image_alt: string;
  component_id: string;
  organization_id: string;
}

export default SavedComponent;
