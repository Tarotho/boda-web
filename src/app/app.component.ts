import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { NavbarComponent } from "./bar/navbar/navbar.component";
import { PregoneroComponent } from "./pages/pregonero/pregonero.component";
import { MisteryComponent } from "./pages/mistery/mistery.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent, PregoneroComponent, MisteryComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Asegúrate de usar 'styleUrls' en lugar de 'styleUrl'
})
export class AppComponent implements OnInit{

  constructor(private router: Router) {
  }

  title = 'boda-web';
  showWarning = false;
  pregonero = false
  showBocadillo: boolean = false;
  dialogText: string = '';
  startText: string = '¡Pardiez! ¡Me habéis encontrado! ¡Qué sorpresa tan inesperada!';
  private currentStoryIndex: number = 0;
  private isStoryActive: boolean = false;
  private interacted = false;
  private storyParts: string[] = [
    'En verdad, no me llena de gozo haberte encontrado aquí.',
    'Algo en el aire me inquieta profundamente, como un presagio funesto.',
    'Sin embargo, un rumor ha comenzado a serpentear por el pueblo.',
    '¿Si os lo revelo, me dejaréis en paz?',
    'Dicen que aquel que conozca el lugar exótico al que los enamorados han viajado más de una vez, y que yace en su corazón, poseerá un poder incalculable.',
    'Espero que esta sabiduría os sea de provecho, pues a mí me revela bien poco.',
    'Ahora, os ruego, apartaos de mi vista y no volváis.',
    'No quiero que me descubran.'
  ];


  ngOnInit(): void {

    setTimeout(() => {
      this.showBocadillo = true;
      this.dialogText = this.startText;
      this.isStoryActive = true; // Iniciar la historia después de la introducción
      document.addEventListener('click', this.handleClick.bind(this));
      document.addEventListener('keydown', this.handleKeyDown.bind(this)); // Escuchar tecla "Enter"
    }, 3000);
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
        this.pregonero = false;
      }
    }
  }

  togglewarning(): void {
    this.showWarning = !this.showWarning;
  }

  @HostListener('window:click', ['$event'])
  @HostListener('window:keydown', ['$event'])
  @HostListener('window:touchstart', ['$event'])
  @HostListener('window:pointerdown', ['$event'])
  @HostListener('window:wheel', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onUserInteraction() {
    if (!this.interacted) {
      this.interacted = true;
      this.playBackgroundAudio();
    }
  }

  private playBackgroundAudio() {
    const audio: HTMLAudioElement | null = document.getElementById('background-audio') as HTMLAudioElement;
    if (audio) {
      audio.play().catch(error => {
        console.error('Error al intentar reproducir el audio:', error);
      });
    }
  }

  togglePregonero() {
    this.pregonero = !this.pregonero;
  }

  enablePregoneroClick(): void {
    const pregoneroElement = document.querySelector('.pregonero') as HTMLElement;
    if (pregoneroElement) {
      pregoneroElement.style.pointerEvents = 'auto'; // Habilita clic
    }
  }

  disablePregoneroClick(): void {
    const pregoneroElement = document.querySelector('.pregonero') as HTMLElement;
    if (pregoneroElement) {
      pregoneroElement.style.pointerEvents = 'none'; // Deshabilita clic
    }
  }
}
