export type ArticleCategory =
  | 'Mercado'
  | 'LaLiga'
  | 'Champions'
  | 'Atlético'
  | 'Premier'
  | 'Opinión'
  | 'Crónica'
  | 'Previa'
  | string;

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'pull'; text: string }
  | { type: 'figure'; caption: string; placeholder: string; imageUrl?: string }
  | { type: 'ad'; slot: 'in-article-slot' };

export interface MarketTickerItem {
  tag: string;
  headline: string;
  time: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  kicker: string;
  author: string;
  authorInitials: string;
  publishedAt: string;
  updatedLabel: string;
  readMinutes: number;
  imageUrl?: string;
  imagePlaceholder: string;
  featured: boolean;
  body: ArticleBlock[];
}

/** Fila tal como viene de Supabase */
export interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  kicker: string;
  author: string;
  author_initials: string;
  published_at: string;
  updated_label: string;
  read_minutes: number;
  image_url: string | null;
  image_placeholder: string;
  featured: boolean;
  published: boolean;
  body: ArticleBlock[];
}

export interface MarketTickerRow {
  id: string;
  tag: string;
  headline: string;
  time_label: string;
  sort_order: number;
  active: boolean;
}
