import { Component } from '@angular/core';
import { Router } from '@angular/router';  
import { AuthService } from '../auth/service/auth.service';  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAuthenticated: boolean;

  constructor(public authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;  
  }
}
