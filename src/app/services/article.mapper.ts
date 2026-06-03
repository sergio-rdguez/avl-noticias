import { Article, ArticleRow, MarketTickerItem, MarketTickerRow } from '../models/article.model';

export function mapArticleRow(row: ArticleRow): Article {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    kicker: row.kicker,
    author: row.author,
    authorInitials: row.author_initials,
    publishedAt: row.published_at,
    updatedLabel: row.updated_label,
    readMinutes: row.read_minutes,
    imageUrl: row.image_url ?? undefined,
    imagePlaceholder: row.image_placeholder,
    featured: row.featured,
    body: Array.isArray(row.body) ? row.body : [],
  };
}

export function mapTickerRow(row: MarketTickerRow): MarketTickerItem {
  return {
    tag: row.tag,
    headline: row.headline,
    time: row.time_label,
  };
}
