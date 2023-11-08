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
  layout_properties: [string];
  is_interactive: boolean;
  elements: [string];
  code_tailwindcss_react: string;
  code_tailwindcss_nextjs: string;
  code_animation_nextjs: string;
  code_animation_react: string;
}

export default Component;
