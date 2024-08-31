import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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
export class AppComponent {


  title = 'boda-web';
  pregonero = false;
  showWarning = false;
  mistery = false;

  private interacted = false;

  togglePregonero(): void {
    this.pregonero = !this.pregonero;
  }
  togglewarning(): void {
    this.showWarning = !this.showWarning;
  }

  handleFinishedStory(): void {
    this.mistery = true;
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
}
