interface Component {
  id: string;
  created_at: Date;
  name: string;
  description: string;
  is_published: boolean;
  is_free: boolean;
  type: string;
  category: string;
  preview_url: string;
  image_src: string;
  image_alt: string;
  image_position: string;
  layout_properties: [string];
  is_interactive: boolean;
  elements: [string];
  code_tailwindcss_react: string;
  code_tailwindcss_nextjs: string;
  code_animation_component: string;
}

export default Component;
