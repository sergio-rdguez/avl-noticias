import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Política de privacidad',
      description: 'Política de privacidad y protección de datos de AVL Noticias.',
      path: '/privacidad',
    });
  }
}
