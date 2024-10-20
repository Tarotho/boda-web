import { Component, HostListener } from '@angular/core';
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
  inputText: string[] = Array(7).fill(''); // Array para los campos de entrada de contraseña
  startDialogueIndex: number = 0;
  navyDialogueIndex: number = 0; // Índice para el diálogo "navy"
  candado: boolean = false;
  navy: boolean = false;
  element: boolean = false;
  passwordCorrect: boolean = false;
  candadoImagen = "/img/candado.png";

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

  navyDialogues = [
    { id: 1, text: '¿por que me hablas? Yo tengo poco que decirte' },
    { id: 2, text: 'Quizas debererias investigar por todos lados, parece que necesitas conjurar algun tipo de palabra o yo que se.' },
    { id: 3, text: '¡Oye! pues mira, alguien debe haberse dejado algo aqui:' },
    { id: 4, text: '"हमारे दो निडर मंगेतरों को कौन सी बड़ी मोटर चालित मशीनें बुरी तरह से अभिशापित कर दी गई हैं?"' },
    { id: 5, text: '¿Que significará?' }
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

  onInput(index: number) {
    // Verificar si el campo actual está completo
    if (this.inputText[index].length === 1) {
      // Mover el enfoque al siguiente campo
      const nextIndex = index + 1;
      if (nextIndex < this.inputText.length) {
        // Encuentra el siguiente campo de entrada y enfócalo
        const nextInput = document.querySelectorAll('.password-char')[nextIndex] as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }

      // Verificar la contraseña cuando se llenen todos los campos
      if (this.inputText.every(char => char.length === 1)) {
        this.checkPassword();
      }
    }
  }

  checkPassword() {
    const password = btoa(this.inputText.join(''));
    const validPasswords = ['UEVMVUNIRQ==', 'cGVsdWNoZQ==']; // Añade todas las contraseñas válidas aquí
    if (validPasswords.includes(password)) {
      console.log("Contraseña correcta");
      this.applyShakeFast()
      this.passwordCorrect = true;
    } else {
      console.log("Contraseña equivocada");
      this.passwordCorrect = false;
      this.clearInput(); // Llama a la función para borrar los campos de entrada
      this.applyShake(); // Aplica el efecto de agitado
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

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.startText) {
      this.advanceDialogue();
    } else if (this.navy) {
      this.advanceNavyDialogue();
    }
  }

  clearInput() {
    // Limpia todos los campos de entrada
    this.inputText = Array(7).fill('');

    // Fuerza la actualización de los campos de entrada en la vista
    setTimeout(() => {
      const inputs = document.querySelectorAll('.password-char') as NodeListOf<HTMLInputElement>;
      inputs.forEach(input => input.value = ''); // Limpia el valor de cada campo
      if (inputs.length > 0) {
        inputs[0].focus(); // Enfoca el primer campo
      }
    });
  }
  applyShake() {
    const candadoImage = document.querySelector('.candado-imagen') as HTMLElement;
    if (candadoImage) {
      candadoImage.classList.add('shake');
      setTimeout(() => {
        candadoImage.classList.remove('shake'); // Remueve la clase después del efecto
      }, 500); // Duración del efecto de agitado
    }
  }

  applyShakeFast() {
    const candadoImage = document.querySelector('.candado-imagen') as HTMLElement;
    if (candadoImage) {
      candadoImage.classList.add('shake-fast');
      setTimeout(() => {
        candadoImage.classList.remove('shake-fast'); // Remueve la clase después del efecto
        this.candadoImagen = '/img/candadoAbierto.png'; // Cambia la imagen después de la animación
        setTimeout(() => {
          this.router.navigate(['/shiva']); // Cambia '/shiva' si tu ruta es diferente
        }, 2000);}, 2000); // Duración del efecto de agitado total
    }
  }

  exitPage(): void {
    this.startText = false;
  }

}
