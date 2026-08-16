export type UploadSection =
  | 'banner'
  | 'bio'
  | 'avatar-chat'
  | 'social-proof'
  | 'portfolio';

export interface UploadConfig {
  label: string;
  recommendedSize: string;
  maxFileSize: number;
  maxFiles: number;
}

export const UPLOAD_CONFIG: Record<UploadSection, UploadConfig> = {

  banner: {
    label: 'Banner',
    recommendedSize: '1920 × 600px',
    maxFileSize: 5_000_000,
    maxFiles: 1
  },

  bio: {
    label: 'Bio',
    recommendedSize: '800 × 800px',
    maxFileSize: 3_000_000,
    maxFiles: 1
  },

  'avatar-chat': {
    label: 'Avatar do chat',
    recommendedSize: '500 × 500px',
    maxFileSize: 2_000_000,
    maxFiles: 1
  },

  'social-proof': {
    label: 'Social proof',
    recommendedSize: '1200 × 800px',
    maxFileSize: 3_000_000,
    maxFiles: 3
  },

  portfolio: {
    label: 'Portfolio',
    recommendedSize: '1200 × 1200px',
    maxFileSize: 5_000_000,
    maxFiles: 20
  }

};