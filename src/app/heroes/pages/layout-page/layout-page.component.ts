import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label:'Listado', icon:'label', url:'./list'},
    {label:'Agregar', icon:'add', url:'./new-hero'},
    {label:'Buscar', icon:'search', url:'./search'},
  ]

  constructor(
    private authService: AuthServiceService,
    private router: Router
    ) { }

  get user(): User|undefined{
    return this.authService.currentUSer;

  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['./auth/login']);
  }
}
