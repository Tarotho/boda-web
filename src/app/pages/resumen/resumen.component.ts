import {Component, ViewEncapsulation} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [NgIf],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'], // Asegúrate de que esté escrito correctamente
  encapsulation: ViewEncapsulation.None // Desactiva la encapsulación
})
export class ResumenComponent {
  images: string[] = [
    '/img/previusly1.png',
    '/img/previusly2.png',
    '/img/previusly3.png',
    '/img/previusly4.png',
  ];

  descriptions: string[] = [
    '¡Oh, así que el pregonero de la taberna es Gerald! <strong class="red">¿Acaso alguien trama un ritual peligroso?</strong>',
    '¿Qué es esto? Parece ser <strong class="red">una cuenta atrás</strong> para el próximo 1 de septiembre del año 2024. ¿Qué calamidad se avecina?',
    '<strong class="red">Ya es 1 de Septiembre</strong> ¿Una invocación, dices?',
    'Vaya, así que han apresado a una desdichada criatura <strong class="red">JUNTO A LAS AGUAS DEL RÍO</strong> y debo rescatarla... de acuerdo.',
    'Gerald se ha marchado, <strong class="red">comentó que dejaría una nota.</strong>'
  ];

  currentIndex: number = 0;
  image = true;

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  get currentDescription(): string {
    return this.descriptions[this.currentIndex];
  }

  next(): void {
    if (this.currentIndex < this.descriptions.length - 1) { // Asegúrate de que solo avance si hay más imágenes
      this.currentIndex++;
      if (this.currentIndex == this.descriptions.length -1){
        this.image = false;
      }
    }
  }

  previous(): void {
    if (this.currentIndex > 0) { // Asegúrate de que solo retroceda si no está en la primera imagen
      this.currentIndex--;
      if (this.currentIndex < this.descriptions.length -1){
        this.image = true;
      }
    }
  }
}
