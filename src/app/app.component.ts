import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuSiteComponent } from "./menu-site/menu-site.component";
import { BannerSiteComponent } from "./banner-site/banner-site.component";
import { FooterSiteComponent } from "./footer-site/footer-site.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, MenuSiteComponent, BannerSiteComponent, FooterSiteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

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
