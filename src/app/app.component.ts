import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuSiteComponent } from "./menu-site/menu-site.component";
import { BannerSiteComponent } from "./banner-site/banner-site.component";
import { BioSiteComponent } from "./bio-site/bio-site.component";
import { PortfolioSiteComponent } from "./portfolio-site/portfolio-site.component";
import { FooterSiteComponent } from "./footer-site/footer-site.component";
import { FormSiteComponent } from "./form-site/form-site.component";
import { TipsSiteComponent } from "./tips-site/tips-site.component";
import { PaintingSiteComponent } from "./painting-site/painting-site.component";

@Component({
  selector: 'app-root',
  imports: [ButtonModule, MenuSiteComponent, BannerSiteComponent, BioSiteComponent, PortfolioSiteComponent, FooterSiteComponent, FormSiteComponent, TipsSiteComponent, PaintingSiteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('formSite') formSite!: FormSiteComponent;

  scrollToForm() {
    if(this.formSite) {
      this.formSite.scrollIntoView();
    }
  }
}
