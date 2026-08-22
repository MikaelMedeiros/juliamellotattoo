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
}

export const UPLOAD_CONFIG: Record<UploadSection, UploadConfig> = {

  banner: {
    label: 'Banner',
    description: 'Imagem principal do site, exibida no topo da página inicial.',
    recommendedSize: '1920 × 600px',
    maxFileSize: 5_000_000,
    maxFiles: 1
  },

  bio: {
    label: 'Bio',
    description: 'Imagem de perfil para a seção de biografia.',
    recommendedSize: '800 × 800px',
    maxFileSize: 3_000_000,
    maxFiles: 1
  },

  'avatar-chat': {
    label: 'Avatar do chat',
    description: 'Imagem de perfil para a seção do chat.',
    recommendedSize: '500 × 500px',
    maxFileSize: 2_000_000,
    maxFiles: 1
  },

  'social-proof': {
    label: 'Social proof',
    description: 'Imagem de apoio social.',
    recommendedSize: '1200 × 800px',
    maxFileSize: 3_000_000,
    maxFiles: 3
  },

  portfolio: {
    label: 'Portfolio',
    description: 'Galeria de trabalhos.',
    recommendedSize: '1200 × 1200px',
    maxFileSize: 5_000_000,
    maxFiles: 20
  }

};