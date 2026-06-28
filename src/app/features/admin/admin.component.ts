import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { AuthService } from 'src/core/auth/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, 
    SelectButtonModule, 
    FormsModule, 
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SpeedDialModule,
    ButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

    value: any;

    menyType: any = 1;  

    authService = inject(AuthService);

    constructor(
      private router: Router) {}

      

    menuOptions: any[] = [
        { icon: 'pi pi-calculator', justify: 'Orçamento', navigate: '/admin/quote' },
        { icon: 'pi pi-home', justify: 'Home', navigate: '/admin/main' },
        { icon: 'pi pi-gift', justify: 'Gift', navigate: '/admin/gift' }      
    ];

    profileItems: MenuItem[] = [
        {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => this.logout()
        }
    ];

    logout(): void {

        this.authService.logout();

        this.router.navigate(['/login']);

    }
  
    navigate(option: any): void {
      this.router.navigate([option.navigate]);
    }
}
