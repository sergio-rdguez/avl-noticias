import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { environment } from '../../../environments/environment';

export type AdBannerPosition =
  | 'header-slot'
  | 'in-article-slot'
  | 'sidebar-slot'
  | 'native-slot'
  | 'responsive-slot';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.html',
  styleUrl: './ad-banner.scss',
})
export class AdBanner implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly host = viewChild<ElementRef<HTMLElement>>('host');

  protected readonly environment = environment;

  readonly position = input<AdBannerPosition>('in-article-slot');
  readonly eyebrow = input('Publicidad');
  /** ID de unidad AdSense (ej. 1234567890) cuando esté aprobado */
  readonly adsenseSlot = input<string | undefined>(undefined);

  protected readonly adsenseEnabled = Boolean(environment.adsenseClientId);

  protected adClass(): string {
    switch (this.position()) {
      case 'header-slot':
        return 'ad--728x90';
      case 'sidebar-slot':
        return 'ad--300x600';
      case 'native-slot':
        return 'ad--native';
      case 'responsive-slot':
        return 'ad--responsive';
      default:
        return 'ad--336x280';
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.adsenseEnabled) {
      return;
    }
    const slot = this.adsenseSlot();
    const el = this.host()?.nativeElement.querySelector('.adsense-unit');
    if (!slot || !el) {
      return;
    }
    try {
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
        (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle || []).push({});
    } catch {
      /* AdSense no cargado aún */
    }
  }
}
