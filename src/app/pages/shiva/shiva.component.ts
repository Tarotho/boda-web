import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface Dialogue {
  id: number;
  text: string;
}

@Component({
  selector: 'app-shiva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule, NgIf],
  templateUrl: './shiva.component.html',
  styleUrls: ['./shiva.component.css']
})
export class ShivaComponent implements OnInit {
  backgroundImage: string = '/img/misteryBackground3.png';
  startText = false;
  startDialogueIndex: number = 0;
  pregonero = false;
  pregoneroDialoge = false;
  contact = false;

  private caveAudioElement!: HTMLAudioElement; // Aserción no nula
  private cantinaAudioElement!: HTMLAudioElement; // Aserción no nula
  private isCantinaPlaying: boolean = false;

  startdialogues = [
    { id: 1, text: 'He quedado complacido por tu labor en este reino, humano.' },
    { id: 2, text: 'Inconcebible es el hecho de que una criatura tan diminuta haya alcanzado tal grandeza.' },
    { id: 3, text: 'Aunque, a decir verdad, todo ha sido gracias a mi influencia.' },
    { id: 4, text: 'Ha sido sencillo engañarte, como seducir a un perro hambriento.' },
    { id: 5, text: 'Escucha, mortal, las palabras que emanan de mi divinidad.' },
    { id: 6, text: 'No estoy obligado a permanecer en este lugar, desperdiciando mi tiempo eterno.' },
    { id: 7, text: 'Ahora puedo proseguir con mis designios.' },
    { id: 8, text: 'MI PROPÓSITO ES LA ANNIHILACIÓN DEL MUNDO Y EL FIN DE ESTA MUNDANA CELEBRACIÓN.' },
    { id: 9, text: 'Si no fuera por las IMPRÍAS MEIGAS, ya habría consumado la destrucción de todos...' },
    { id: 10, text: 'Con esperanza, la próxima vez que te vea, será con la mirada vacía de la muerte.' },
    { id: 11, text: 'Hasta la vista, mortal.' },
    { id: 12, text: '¡Pardiez,  qué decís vos!' },
    { id: 13, text: '¿Que la criatura que liberaste es, en verdad, un dios destructor de mundos, y que las brujas buscaban, en su bondad, salvar la ciudad?' },
    { id: 14, text: '¿Y ahora pretendéis decirme que, además, ansía destruir la ceremonia?' },
    { id: 15, text: 'Por mi fe, os advertí que algo oscuro y nefasto se cernía sobre nosotros.' },
    { id: 16, text: 'Lo más sensato será acudir sin demora al sabio chamán del poblado.' },
    { id: 17, text: 'Aunque, ¿dónde podría hallarse su augusta presencia?' },
    { id: 18, text: '¡Ah, ahora lo recuerdo bien! Aquí tenéis el códice con sus señas.' },
    { id: 18, text: 'Pregúntale si CONOCE ALGUNA MEIGA.' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.caveAudioElement = document.getElementById('background-audio') as HTMLAudioElement;
    this.caveAudioElement.src = '/audio/cave-background.mp3';
    this.caveAudioElement.preload = 'auto';
    this.caveAudioElement.loop = true;
    this.caveAudioElement.play();

    this.cantinaAudioElement = new Audio('/audio/CantinaBand.mp3'); // Inicializada aquí
    this.cantinaAudioElement.preload = 'auto';
    this.cantinaAudioElement.load();

    console.log("Cave audio source set and playing");

    setTimeout(() => {
      this.startText = true;
      console.log("Start text visible");
    }, 2000);
  }

  getCurrentDialogue(): Dialogue {
    return this.startdialogues[this.startDialogueIndex];
  }

  advanceDialogue() {
    console.log(`Advancing dialogue: current index ${this.startDialogueIndex}`);

    if (this.startDialogueIndex < this.startdialogues.length - 1) {
      this.startDialogueIndex++;

      if (this.startDialogueIndex > 10) {
        if (this.startDialogueIndex === 11) {
          console.log("Switching to Cantina music");
          this.caveAudioElement.pause();
          this.caveAudioElement.currentTime = 0;
          this.playCantina();
        }

        this.backgroundImage = '/img/misteryBackground4.jpg';
        this.startText = false;
        setTimeout(() => {
          this.getPregonero();
        }, 2000);

        if (this.startDialogueIndex === this.startdialogues.length - 1) {
          this.contact = true;
        }
      }
    }
  }

  playCantina() {
    if (!this.isCantinaPlaying) {
      this.cantinaAudioElement.play();
      this.isCantinaPlaying = true;
    }
  }

  refreshPage() {
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }

  getPregonero() {
    console.log("Activating pregonero");
    setTimeout(() => {
      this.pregonero = true;
      setTimeout(() => {
        this.pregoneroDialoge = true;
      }, 2000);
    }, 2000);
  }

  advanceDialogueIfActive() {
    console.log(`Advance dialogue called: startText=${this.startText}, pregoneroDialoge=${this.pregoneroDialoge}`);
    if (this.startText || this.pregoneroDialoge) {
      this.advanceDialogue();
    }
  }
}
