import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router'; // Importar RouterModule y Routes
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';  // Importar el componente Header
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AlojamientosComponent } from './components/alojamientos/alojamientos.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlojamientoInfoComponent } from './components/public/alojamiento-info/alojamiento-info.component';
import { EventosComponent } from './components/eventos/eventos/eventos.component';
import { MonumentosComponent } from './components/monumentos/monumentos/monumentos.component';
import { PuntosDeInteresComponent } from './components/puntos-de-interes/puntos-de-interes/puntos-de-interes.component';
import { RestaurantesComponent } from './components/restaurantes/restaurantes/restaurantes.component';
import { RutasTuristicasComponent } from './components/rutas-turisticas/rutas-turisticas/rutas-turisticas.component';
import { UsuariosComponent } from './components/usuarios/usuarios/usuarios.component';
import { ReservasComponent } from './components/reservas/reservas/reservas.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/components/login/login.component';
import { TokenInterceptor } from './auth/tokenInterceptor';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlojamientosPublicComponent } from './components/public/alojamientos-public/alojamientos-public.component';
import { MonumentosPublicComponent } from './components/public/monumentos-public/monumentos-public.component';
import { EventosPublicComponent } from './components/public/eventos-public/eventos-public.component';
import { RutasPublicComponent } from './components/public/rutas-public/rutas-public.component';
import { RestaurantesPublicComponent } from './components/public/restaurantes-public/restaurantes-public.component';
import { PuntosInteresPublicComponent } from './components/public/puntos-interes-public/puntos-interes-public.component';
import { PuntosInteresPublicInfoComponent } from './components/public/puntos-interes-public-info/puntos-interes-public-info.component';
import { RestaurantesPublicInfoComponent } from './components/public/restaurantes-public-info/restaurantes-public-info.component';
import { RutasPublicInfoComponent } from './components/public/rutas-public-info/rutas-public-info.component';
import { EventosPublicInfoComponent } from './components/public/eventos-public-info/eventos-public-info.component';
import { MonumentosPublicInfoComponent } from './components/public/monumentos-public-info/monumentos-public-info.component';
import { PerfilComponent } from './components/public/perfil/perfil.component';
import { ValoracionesComponent } from './components/valoraciones/valoraciones.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { RoleGuard } from './auth/role.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Acceso público
  { path: 'contacto', component: ContactoComponent },
  
  // Rutas públicas
  { path: 'alojamientos-public', component: AlojamientosPublicComponent },
  { path: 'alojamiento/:id', component: AlojamientoInfoComponent },

  { path: 'eventos-public', component: EventosPublicComponent },
  { path: 'evento/:id', component: EventosPublicInfoComponent  },

  { path: 'monumentos-public', component: MonumentosPublicComponent },
  { path: 'monumento/:id', component: MonumentosPublicInfoComponent },

  { path: 'puntos-de-interes-public', component: PuntosInteresPublicComponent },
  { path: 'punto-interes/:id', component: PuntosInteresPublicInfoComponent },


  { path: 'restaurantes-public', component: RestaurantesPublicComponent },
  { path: 'restaurante/:id', component: RestaurantesPublicInfoComponent },

  { path: 'rutas-public', component: RutasPublicComponent },
  { path: 'ruta/:id', component: RutasPublicInfoComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },




  // Rutas privadas, protegidas por AuthGuard
  { path: 'alojamientos', component: AlojamientosComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  
  { path: 'eventos', component: EventosComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'monumentos', component: MonumentosComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'puntos-de-interes', component: PuntosDeInteresComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'restaurantes', component: RestaurantesComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'rutas-turisticas', component: RutasTuristicasComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'valoraciones', component: ValoracionesComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } }, 
  
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AlojamientosComponent,
    ContactoComponent,
    AlojamientoInfoComponent,
    EventosComponent,
    MonumentosComponent,
    PuntosDeInteresComponent,
    RestaurantesComponent,
    RutasTuristicasComponent,
    UsuariosComponent,
    ReservasComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    AlojamientosPublicComponent,
    MonumentosPublicComponent,
    EventosPublicComponent,
    RutasPublicComponent,
    RestaurantesPublicComponent,
    PuntosInteresPublicComponent,
    PuntosInteresPublicInfoComponent,
    RestaurantesPublicInfoComponent,
    RutasPublicInfoComponent,
    EventosPublicInfoComponent,
    MonumentosPublicInfoComponent,
    PerfilComponent,
    ValoracionesComponent,
    RegisterComponent,
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
