import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const expectedRole = route.data['expectedRole']; 
        const userRole = this.authService.getRole();

        console.log('expectedRole:', expectedRole);
        console.log('userRole:', userRole);

        if (userRole === expectedRole) {
            return true;
        }

        this.router.navigate(['/home']);
        return false;
    }
}
