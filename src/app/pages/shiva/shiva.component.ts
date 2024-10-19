import { Component, OnInit } from '@angular/core'; // Importa OnInit
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shiva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './shiva.component.html',
  styleUrl: './shiva.component.css'
})
export class ShivaComponent implements OnInit { // Implementa OnInit
  startText = false; // Cambia a false para que no se muestre al inicio
  startDialogueIndex: number = 0;

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
    if (this.startDialogueIndex < this.startdialogues.length - 1) {
      this.startDialogueIndex++;
    } else {
      this.startText = false;
    }
  }

  refreshPage() {
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }
}
