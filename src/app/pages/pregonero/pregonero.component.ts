import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MisteryComponent} from '../mistery/mistery.component';

@Component({
  selector: 'app-pregonero',
  standalone: true,
  imports: [FormsModule, MatIconModule, CommonModule, MisteryComponent],
  templateUrl: './pregonero.component.html',
  styleUrls: ['./pregonero.component.css']
})
export class PregoneroComponent implements OnInit, OnDestroy {
  @Output() finishedStory = new EventEmitter<void>();

  startText: string = '¡Ah, buen hombre! ¿Qué fortuna es la que os trae de nuevo a este lugar?';
  dialogText: string = '';
  showPregonero: boolean = false;
  showBocadillo: boolean = false;
  mistery = false;

  private storyParts: string[] = [
    'Agradezco, por cierto, la intervención que realizasteis lunas a, bien hecho al detener aquellos desconocidos.',
    'Os confieso, tras los infortunios del reciente día, el rumbo de los acontecimientos me resulta inquietante.',
    'Considero prudente refugiarme en algún rincón apartado, lejos de miradas curiosas.',
    'Si en alguna ocasión requerís de mi asistencia, me hallaréis vagando por el pueblo.',
    'Permaneceré en este lugar un par de días más, y luego...',
    'Chao Chao.',
    '¿Ya os dirigís hacia allá?',
    'Muy bien, os deseo un día pleno de fortuna y bendición.'
  ];
  private currentStoryIndex: number = 0;
  private isStoryActive: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showPregonero = true;
    }, 2000);

    setTimeout(() => {
      this.showBocadillo = true;
      this.dialogText = this.startText;
      this.isStoryActive = true; // Iniciar la historia después de la introducción
      document.addEventListener('click', this.handleClick.bind(this));
      document.addEventListener('keydown', this.handleKeyDown.bind(this)); // Escuchar tecla "Enter"
    }, 3000);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClick.bind(this));
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleClick(): void {
    this.advanceStory();
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.advanceStory();
    }
  }

  private advanceStory(): void {
    if (this.isStoryActive) {
      if (this.currentStoryIndex < this.storyParts.length) {
        this.dialogText = this.storyParts[this.currentStoryIndex];
        this.currentStoryIndex++;
      } else {
        this.isStoryActive = false;
        this.router.navigate(['/cave'])
      }
    }
  }

  refreshPage() {
    this.router.navigate(['/inicio']).then(r => {
    });
  }
}
