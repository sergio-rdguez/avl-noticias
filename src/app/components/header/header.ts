import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdBanner } from '../ad-banner/ad-banner';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AdBanner, DatePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly activeSection = input<string>('Portada');
  protected readonly today = new Date();
}
