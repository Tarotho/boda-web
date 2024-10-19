import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [NgIf],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'] // Asegúrate de que esté escrito correctamente
})
export class ResumenComponent {
  images: string[] = [
    '/img/previusly1.png',
    '/img/previusly2.png',
    '/img/previusly3.png',
    '/img/previusly4.png',
  ];

  descriptions: string[] = [
    '¡Oh, así que el pregonero de la taberna es Gerald! ¿Acaso alguien trama un ritual peligroso?',
    '¿Qué es esto? Parece ser una cuenta atrás para el próximo 1 de septiembre del año 2024. ¿Qué calamidad se avecina?',
    '¿Una invocación, dices?',
    'Vaya, así que han apresado a una desdichada criatura <strong>JUNTO A LAS AGUAS DEL RÍO</strong> y debo rescatarla... de acuerdo.'
  ];

  currentIndex: number = 0;

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  get currentDescription(): string {
    return this.descriptions[this.currentIndex];
  }

  next(): void {
    if (this.currentIndex < this.images.length - 1) { // Asegúrate de que solo avance si hay más imágenes
      this.currentIndex++;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) { // Asegúrate de que solo retroceda si no está en la primera imagen
      this.currentIndex--;
    }
  }
}
