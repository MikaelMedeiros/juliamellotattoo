export type UploadSection =
  | 'banner'
  | 'bio'
  | 'avatar-chat'
  | 'social-proof'
  | 'portfolio';

export interface UploadConfig {
  label: string;
  description: string;
  recommendedSize: string;
  maxFileSize: number;
  maxFiles: number;
  icon: string;
}

export const UPLOAD_CONFIG: Record<UploadSection, UploadConfig> = {

  banner: {
    label: 'Banner',
    description: 'Imagem principal do site, exibida no topo da página inicial.',
    recommendedSize: '1920 × 600px',
    maxFileSize: 5_000_000,
    maxFiles: 5,
    icon: 'pi-image'
  },

  bio: {
    label: 'Bio',
    description: 'Imagem de perfil para a seção de biografia.',
    recommendedSize: '800 × 800px',
    maxFileSize: 3_000_000,
    maxFiles: 1,
    icon: 'pi-user'
  },

  'avatar-chat': {
    label: 'Avatar do chat',
    description: 'Imagem de perfil para a seção do chat.',
    recommendedSize: '500 × 500px',
    maxFileSize: 2_000_000,
    maxFiles: 1,
    icon: 'pi-comments'
  },

  'social-proof': {
    label: 'Social proof',
    description: 'Feedback de seus clientes',
    recommendedSize: '1200 × 800px',
    maxFileSize: 3_000_000,
    maxFiles: 12,
    icon: 'pi-users'
  },

  portfolio: {
    label: 'Portfolio',
    description: 'Galeria de trabalhos.',
    recommendedSize: '1200 × 1200px',
    maxFileSize: 5_000_000,
    maxFiles: 20,
    icon: 'pi-images'
  }

};