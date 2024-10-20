import { Component, HostListener, OnInit } from '@angular/core'; // Importa OnInit
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shiva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule, NgIf],
  templateUrl: './shiva.component.html',
  styleUrls: ['./shiva.component.css']
})
export class ShivaComponent implements OnInit { // Implementa OnInit
  backgroundImage: string = '/img/misteryBackground3.png'; // Cambia la URL según lo necesites
  startText = false; // Cambia a false para que no se muestre al inicio
  startDialogueIndex: number = 0;
  pregonero = false;
  pregoneroDialoge = false;
  contact = false;

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
    // Establece un temporizador de 2 segundos antes de iniciar el diálogo
    setTimeout(() => {
      this.startText = true; // Cambia a true después de 2 segundos
    }, 2000);
  }

  getCurrentDialogue() {
    return this.startdialogues[this.startDialogueIndex];
  }

  advanceDialogue() {
    if (this.startDialogueIndex < this.startdialogues.length -1) {
      this.startDialogueIndex++;
      if (this.startDialogueIndex > 10){
        this.backgroundImage = '/img/misteryBackground4.jpg';
        this.startText = false;
        setTimeout(() => {
          this.getPregonero();
        }, 2000);
        if (this.startDialogueIndex == this.startdialogues.length -1){
          this.contact = true;
        }
      }
    }
  }

  refreshPage() {
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }

  getPregonero() {
    const audioElement = document.getElementById('background-audio') as HTMLAudioElement;
    audioElement.src = '/audio/CantinaBand.mp3'; // Cambia la fuente del audio
    audioElement.load(); // Carga el nuevo archivo de audio
    audioElement.play(); // Reproduce la nueva canción

    setTimeout(() => {
      this.pregonero = true;
      setTimeout(() => {
        this.pregoneroDialoge = true;
      }, 2000);
    }, 2000); // Espera 2 segundos antes de activar el pregonero
  }

  advanceDialogueIfActive() {
    if (this.startText || this.pregoneroDialoge) {
      this.advanceDialogue();
    }
  }

}
