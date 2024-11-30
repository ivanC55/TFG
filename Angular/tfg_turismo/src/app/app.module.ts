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
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlojamientosPublicComponent } from './components/public/alojamientos-public/alojamientos-public.component';
import { MonumentosPublicComponent } from './components/public/monumentos-public/monumentos-public.component';
import { EventosPublicComponent } from './components/public/eventos-public/eventos-public.component';
import { RutasPublicComponent } from './components/public/rutas-public/rutas-public.component';
import { RestaurantesPublicComponent } from './components/public/restaurantes-public/restaurantes-public.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Acceso público
  { path: 'contacto', component: ContactoComponent },
  { path: 'dashboard', component: DashboardComponent },
  //
  { path: 'alojamientos-public', component:AlojamientosPublicComponent},
  { path: 'alojamientos', component: AlojamientosComponent,  }, // Protegido
  { path: 'alojamiento/:id', component: AlojamientoInfoComponent, },


  { path: 'eventos', component: EventosComponent },
  { path: 'eventos-public', component: EventosPublicComponent },

  { path: 'monumentos-public', component: MonumentosPublicComponent},
  { path: 'monumentos', component: MonumentosComponent },


  { path: 'puntos-de-interes', component: PuntosDeInteresComponent,  },
  { path: 'restaurantes', component: RestaurantesComponent,  },
  { path: 'rutas-turisticas', component: RutasTuristicasComponent, },
  { path: 'usuarios', component: UsuariosComponent,},
  { path: 'reservas', component: ReservasComponent,},
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
    DashboardComponent,
    AlojamientosPublicComponent,
    MonumentosPublicComponent,
    EventosPublicComponent,
    RutasPublicComponent,
    RestaurantesPublicComponent,
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
