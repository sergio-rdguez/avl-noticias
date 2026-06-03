import { Routes } from '@angular/router';
import { HomeFeed } from './components/home-feed/home-feed';
import { ArticleDetail } from './components/article-detail/article-detail';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { LegalNotice } from './pages/legal-notice/legal-notice';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeFeed },
  { path: 'article/:slug', component: ArticleDetail },
  { path: 'privacidad', component: PrivacyPolicy },
  { path: 'aviso-legal', component: LegalNotice },
  { path: '**', redirectTo: 'home' },
];
