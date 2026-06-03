import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { SeoService } from '../../services/seo';
import { AdBanner } from '../ad-banner/ad-banner';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-article-detail',
  imports: [AsyncPipe, RouterLink, AdBanner, Sidebar],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss',
})
export class ArticleDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly articles = inject(ArticleService);
  private readonly seo = inject(SeoService);

  readonly vm$ = this.route.paramMap.pipe(
    map((params) => params.get('slug') ?? ''),
    switchMap((slug) =>
      combineLatest({
        article: this.articles.getBySlug(slug),
        related: this.articles.getRelated(slug),
        mostRead: this.articles.getMostRead(),
      }).pipe(map((data) => ({ slug, ...data })))
    )
  );

  ngOnInit(): void {
    this.vm$.subscribe((vm) => {
      if (vm.article) {
        this.seo.setPage({
          title: vm.article.title,
          description: vm.article.excerpt,
          path: `/article/${vm.article.slug}`,
          type: 'article',
        });
      }
    });
  }
}
