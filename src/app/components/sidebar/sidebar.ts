import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../models/article.model';
import { AdBanner } from '../ad-banner/ad-banner';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, AdBanner],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly mostRead = input<Article[]>([]);
  readonly excludeSlug = input<string | undefined>(undefined);
}
