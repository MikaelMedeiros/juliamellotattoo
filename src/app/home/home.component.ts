import { Component } from '@angular/core';
import { BioSiteComponent } from "../bio-site/bio-site.component";
import { PortfolioSiteComponent } from "../portfolio-site/portfolio-site.component";
import { FormSiteComponent } from "../form-site/form-site.component";
import { TipsSiteComponent } from "../tips-site/tips-site.component";
import { SocialProofComponent } from "../social-proof/social-proof.component";

@Component({
  selector: 'app-home',
  imports: [BioSiteComponent, PortfolioSiteComponent, FormSiteComponent, TipsSiteComponent, SocialProofComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
