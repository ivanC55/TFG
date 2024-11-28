import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../app/auth/service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        // Verificar si la ruta es pública y no agregar token en esos casos
        const isPublicRoute = req.url.includes('/api/alojamientos') || req.url.includes('/api/monumentos');

        if (token && !isPublicRoute) {
            // Si no es una ruta pública, se agrega el token de autorización
            console.log('Token encontrado:', token);
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
            });
            return next.handle(cloned);
        }
        // Si la ruta es pública o no hay token, se hace la solicitud normalmente
        return next.handle(req);
    }
}