import { Routes } from '@angular/router';
import { ComoLlegarComponent } from './pages/como-llegar/como-llegar.component';
import { LaFincaComponent } from './pages/la-finca/la-finca.component';
import { MasInfoComponent } from './pages/mas-info/mas-info.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { VestimentaComponent } from './pages/vestimenta/vestimenta.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import {CaveComponent} from "./pages/cave/cave.component";
import {PregoneroComponent} from "./pages/pregonero/pregonero.component";
import {ShivaComponent} from "./pages/shiva/shiva.component";

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'lafinca', component: LaFincaComponent},
    {path: 'comollegar', component: ComoLlegarComponent},
    {path: 'preguntas', component: MasInfoComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'vestimenta', component: VestimentaComponent},
    {path: 'encuesta', component: EncuestaComponent},
    {path: 'cave', component: CaveComponent},
    {path: 'taberna', component: PregoneroComponent},
    {path: 'shiva', component: ShivaComponent},
    { path: 'encuesta.html', redirectTo: 'encuesta', pathMatch: 'full' },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: '**', redirectTo: '/inicio', pathMatch: 'full' }

];
