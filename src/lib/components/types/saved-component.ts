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
  image_position: string;
  organization_id: string;
  component_id: string;
}

export default SavedComponent;
