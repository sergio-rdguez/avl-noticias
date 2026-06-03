import { Injectable, inject } from '@angular/core';
import { catchError, from, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import {
  Article,
  ArticleRow,
  MarketTickerItem,
  MarketTickerRow,
} from '../models/article.model';
import { mapArticleRow, mapTickerRow } from './article.mapper';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private readonly supabase = inject(SupabaseService);

  private readonly articles$ = this.fetchArticles().pipe(shareReplay(1));

  private fetchArticles(): Observable<Article[]> {
    if (!this.supabase.client) {
      return of([]);
    }

    return from(
      this.supabase.client
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return (data as ArticleRow[]).map(mapArticleRow);
      }),
      catchError((err) => {
        console.error('[ArticleService] Error cargando artículos', err);
        return of([]);
      })
    );
  }

  getFeatured(): Observable<Article | undefined> {
    if (!this.supabase.client) {
      return of(undefined);
    }

    return from(
      this.supabase.client
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('featured', true)
        .limit(1)
        .maybeSingle()
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data ? mapArticleRow(data as ArticleRow) : undefined;
      }),
      switchMap((featured) =>
        featured
          ? of(featured)
          : this.articles$.pipe(map((list) => list[0]))
      ),
      catchError(() => of(undefined))
    );
  }

  getHomeArticles(): Observable<Article[]> {
    return this.articles$.pipe(
      map((articles) => articles.filter((a) => !a.featured))
    );
  }

  getSecondaryCards(): Observable<Article[]> {
    return this.getHomeArticles().pipe(map((articles) => articles.slice(0, 3)));
  }

  getSideList(): Observable<Article[]> {
    return this.getHomeArticles().pipe(map((articles) => articles.slice(0, 5)));
  }

  getMostRead(): Observable<Article[]> {
    return this.articles$.pipe(map((articles) => articles.slice(0, 5)));
  }

  getRelated(currentSlug: string): Observable<Article[]> {
    return this.articles$.pipe(
      map((articles) => articles.filter((a) => a.slug !== currentSlug).slice(0, 3))
    );
  }

  getBySlug(slug: string): Observable<Article | undefined> {
    if (!this.supabase.client) {
      return of(undefined);
    }

    return from(
      this.supabase.client
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle()
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return data ? mapArticleRow(data as ArticleRow) : undefined;
      }),
      catchError(() => of(undefined))
    );
  }

  getTicker(): Observable<MarketTickerItem[]> {
    if (!this.supabase.client) {
      return of([]);
    }

    return from(
      this.supabase.client
        .from('market_ticker')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return (data as MarketTickerRow[]).map(mapTickerRow);
      }),
      catchError(() => of([]))
    );
  }

  isBackendReady(): boolean {
    return this.supabase.isConfigured;
  }
}
