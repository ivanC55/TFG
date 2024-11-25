import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; // Importar RouterModule y Routes
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';  // Importar el componente Header
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AlojamientosComponent } from './components/alojamientos/alojamientos.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlojamientoInfoComponent } from './components/alojamiento-info/alojamiento-info.component';
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
import { AuthGuard } from './auth/authGuard';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Acceso público
  { path: 'contacto', component: ContactoComponent },
  //
  { path: 'alojamientos', component: AlojamientosComponent, canActivate: [AuthGuard] }, // Protegido
  { path: 'alojamiento/:id', component: AlojamientoInfoComponent, canActivate: [AuthGuard] },
  { path: 'eventos', component: EventosComponent, canActivate: [AuthGuard] },
  { path: 'monumentos', component: MonumentosComponent, canActivate: [AuthGuard] },
  { path: 'puntos-de-interes', component: PuntosDeInteresComponent, canActivate: [AuthGuard] },
  { path: 'restaurantes', component: RestaurantesComponent, canActivate: [AuthGuard] },
  { path: 'rutas-turisticas', component: RutasTuristicasComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  //
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Página de inicio por defecto
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
