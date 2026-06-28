import { Component } from '@angular/core';
import { BioSiteComponent } from "./bio-site/bio-site.component";
import { PortfolioSiteComponent } from "./portfolio-site/portfolio-site.component";
import { FormSiteComponent } from "./form-site/form-site.component";
import { TipsSiteComponent } from "./tips-site/tips-site.component";
import { SocialProofComponent } from "./social-proof/social-proof.component";
import { FooterSiteComponent } from "./footer-site/footer-site.component";
import { Router } from '@angular/router';
import { BannerSiteComponent } from "./banner-site/banner-site.component";
import { MenuSiteComponent } from "./menu-site/menu-site.component";

@Component({
  selector: 'app-home',
  imports: [BioSiteComponent, PortfolioSiteComponent, FormSiteComponent, TipsSiteComponent, SocialProofComponent, FooterSiteComponent, BannerSiteComponent, MenuSiteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}
  
  scrollToForm(section: string) {
    this.router.navigate(
      ['/'],
      {
        fragment: section
      }
    );
  }
  
}
