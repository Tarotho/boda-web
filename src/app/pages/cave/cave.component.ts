import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cave',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './cave.component.html',
  styleUrls: ['./cave.component.css']
})
export class CaveComponent {
  showWarning = true; // Muestra el mensaje de advertencia inicialmente

  startText = true;
  inputText = '';
  startDialogueIndex: number = 0;
  navyDialogueIndex: number = 0; // Índice para el diálogo "navy"
  candado: boolean = false;
  navy: boolean = false;
  element: boolean = false;
  passwordInput: string = '';
  passwordCorrect: boolean = false;
  successMessage: string = '';

  startdialogues = [
    { id: 1, text: 'Hey!', x: '10%', y: '10%' },
    { id: 2, text: '¡¡HEEEEY!!', x: '80%', y: '10%' },
    { id: 3, text: '¡¡HEEEEEYYY!! ¡¡ESCUCHA!!', x: '10%', y: '80%' },
    { id: 4, text: 'En menudo lio me he metido' },
    { id: 5, text: 'Los tipos malos esos lo que querian era secuestrarme y encerrarme' },
    { id: 6, text: 'Menos mal que has llegado a tiempo para espantarlos!' },
    { id: 7, text: 'Por favor, ¿podrias sacarme de aqui?' },
    { id: 8, text: 'Es tan sencillo como abrir el candado de la jaula...' },
    { id: 9, text: 'Estoy segura de que si investigas un poco por ahi podras encontrar como abrilo.' },
    { id: 10, text: 'Esta cueva esta situada al lado del rio, en la zona rocosa.' },
    { id: 11, text: 'Por favor, no te olvides de mi!' }
  ];

  navyDialogues = [ // Frases para el diálogo de "navy"
    { id: 1, text: '¿por que me hablas? Yo tengo poco que decirte' },
    { id: 2, text: 'Quizas debererias investigar por todos lados, parece que necesitas conjurar algun tipo de palabra o yo que se.' },
    { id: 3, text: '¡Oye! pues mira, alguien debe haberse dejado algo aqui:' },
    { id: 4, text: '"¿Con qué objetos transportadores iguales de gran tamaño han tenido una terrible maldición nuestros dos intrépidos personajes?"'},
    { id: 4, text: '¿Que significará?' }
  ];

  constructor(private router: Router) { }

  getCurrentDialogue() {
    return this.startdialogues[this.startDialogueIndex];
  }

  getCurrentNavyDialogue() {
    return this.navyDialogues[this.navyDialogueIndex];
  }

  toggleCandado(): void {
    this.candado = !this.candado;
    this.navy = false;
    this.element = false;
  }

  toggleNavy(): void {
    this.navy = !this.navy;
    this.element = false;
    this.candado = false;
    this.navyDialogueIndex = 0; // Reinicia el índice del diálogo navy al activar
  }

  toggleElement(): void {
    this.element = !this.element;
    this.candado = false;
    this.navy = false;
  }

  advanceDialogue() {
    if (this.startDialogueIndex < this.startdialogues.length - 1) {
      this.startDialogueIndex++;
    } else {
      this.startText = false;
    }
  }

  advanceNavyDialogue() {
    if (this.navyDialogueIndex < this.navyDialogues.length - 1) {
      this.navyDialogueIndex++;
    } else {
      this.navy = false;  // Desactiva el diálogo navy al finalizar
    }
  }

  onEnter() {
    if (this.passwordInput === 'hola') {
      this.passwordCorrect = true;
      this.successMessage = '¡Felicidades!';
    } else {
      this.passwordCorrect = false;
      this.successMessage = '';
    }
  }

  refreshPage() {
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }

  startGame() {
    this.showWarning = false;  // Ocultar el mensaje de advertencia y comenzar el juego
  }
}
