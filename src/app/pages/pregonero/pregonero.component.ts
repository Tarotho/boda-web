import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MisteryComponent} from '../mistery/mistery.component';
import {ResumenComponent} from "../resumen/resumen.component";

@Component({
  selector: 'app-pregonero',
  standalone: true,
  imports: [FormsModule, MatIconModule, CommonModule, MisteryComponent, ResumenComponent],
  templateUrl: './pregonero.component.html',
  styleUrls: ['./pregonero.component.css']
})
export class PregoneroComponent {

  note = false;
  cubo = false;
  previusly = true;
  constructor(private router: Router) {
  }

  refreshPage() {
    this.router.navigate(['/inicio']).then(r => {
    });
  }

  toggleNote(){
    this.note = !this.note;
    this.cubo = false;
  }
  toggleCubo(){
    this.cubo = !this.cubo;
    this.note = false;
  }

  togglePreviusly() {
    this.previusly = false;
  }
}
