import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { SeoService } from '../../services/seo';
import { AdBanner } from '../ad-banner/ad-banner';

@Component({
  selector: 'app-home-feed',
  imports: [AsyncPipe, RouterLink, AdBanner],
  templateUrl: './home-feed.html',
  styleUrl: './home-feed.scss',
})
export class HomeFeed implements OnInit {
  private readonly articles = inject(ArticleService);
  private readonly seo = inject(SeoService);

  readonly vm$ = combineLatest({
    featured: this.articles.getFeatured(),
    sideList: this.articles.getSideList(),
    cards: this.articles.getSecondaryCards(),
    ticker: this.articles.getTicker(),
  }).pipe(
    map((vm) => ({
      ...vm,
      backendReady: this.articles.isBackendReady(),
      hasContent: Boolean(vm.featured) || vm.cards.length > 0,
    }))
  );

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Portada',
      description:
        'Última hora del Atlético de Madrid, mercado de fichajes, LaLiga y Champions. AVL Noticias.',
      path: '/home',
    });
  }
}
