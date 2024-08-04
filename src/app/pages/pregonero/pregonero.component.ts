import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pregonero',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './pregonero.component.html',
  styleUrls: ['./pregonero.component.css']
})
export class PregoneroComponent implements OnInit, OnDestroy {

  @Output() finishedStory = new EventEmitter<void>();

  startText: string = '¡Bienvenido a la taberna! Soy Gerald, EL PREGONERO, ¿puedo ayudarte en algo?';
  dialogText: string = '';
  inputText: string = '';
  showPregonero: boolean = false;
  showBocadillo: boolean = false;

  // Lista de frases prefijadas
  private paragraphs: string[] = [
    'Por los cielos, ¿quién puede discernir la verdad en estos tiempos inciertos?',
    'No me es dado conocer los caprichos del destino; tal vez el tiempo revele lo que buscas.',
    'En verdad, mi memoria es como la bruma matutina; nada queda claro en su neblina.',
    'El bosque de incertidumbre es denso; apenas se vislumbran los caminos a seguir.',
    'He escuchado murmullos de antiguos sabios, pero las respuestas parecen esquivas como sombras.',
    'En mi andar por tierras desconocidas, no he hallado nada que esclarezca lo que consultas.',
    'El viento susurra secretos que los hombres no están hechos para entender plenamente.',
    'Las estrellas en el cielo parecen burlarse de nuestras ansias de saber más allá de lo que es dado conocer.',
    'Cada senda que pisamos está cubierta de dudas y enigmas; ninguna dirección parece definitiva.',
    'He oído que el destino es caprichoso y que la sabiduría está escondida en las nieblas del tiempo.',
    'Los caminos que recorremos son tan inciertos como el vuelo de un pájaro en la tormenta.',
    'A veces, las respuestas que buscamos se encuentran en los susurros del viento, pero siempre se desvanecen al oído.',
    '¿Quién puede decir qué trae el mañana? Las preguntas del presente se pierden en la marea del incierto.',
    'Los sabios de antaño hablaban en acertijos y enigmáticas rimas, y quizás por ello hallaban la verdad esquiva.',
    'El misterio es el velo que cubre las verdades del mundo; el levantarlo requiere más que simple curiosidad.',
    'En este rincón del universo, las respuestas parecen tan distantes como las estrellas en el firmamento.',
    'Los caminos de la vida están llenos de bifurcaciones; saber cuál es el correcto a menudo es un juego del azar.',
    'La verdad es como el oro escondido en las colinas; sólo los más persistentes hallan su brillo.',
    'El viejo sabio dice que las respuestas se encuentran en el corazón, pero el corazón es un laberinto.',
    'A menudo, la verdad se encuentra en la niebla del misterio, escondida de los ojos curiosos y ansiosos.'
  ];

  private availableParagraphs: string[] = [...this.paragraphs]; // Copia de las frases disponibles
  private usedParagraphs: string[] = []; // Frases ya usadas
  attemptCount: number = 0;
  private isStoryActive: boolean = false; // Controla si la historia está activa
  private storyParts: string[] = [
    'Oh noble aventurero, venid más cerca y escuchad con atención.',
    'Los cielos han oscurecido y un ominoso presagio se cierne sobre nuestro reino. Magos oscuros, de poder temible y corazón corrompido, se acercan con intenciones nefastas. Sus artes mágicas son tan profundas como la noche más oscura, y sus intenciones son nada menos que la dominación total de nuestras tierras.',
    'Los vientos susurran de sus malas artes y de los conjuros que han lanzado para engullir nuestro reino en una sombra interminable. Las torres de nuestra fortaleza temen su llegada, y los campos que antes florecían ahora languidecen en una triste penumbra. Las criaturas del bosque, antaño guardianes leales, ahora se esconden en el temor de la oscuridad que se aproxima.',
    'Mas he aquí la esperanza, la chispa en medio de la tormenta. Se ha profetizado que solo un héroe de gran valor y corazón puro puede enfrentarse a esta amenaza. Tú, valiente salvador, eres el único que posee el coraje necesario para desafiar a estos magos oscuros. El destino del reino reposa en tus manos, y sólo tú puedes deshacer el conjuro de oscuridad que amenaza con consumirnos.',
    'Prepárate, pues la batalla será dura y las pruebas serán muchas. Pero no temáis, por la luz de la esperanza y la fortaleza de tu espíritu guiarán el camino. Armaos con valor y determinación, y aventúrate en la oscuridad para recuperar la luz perdida. El reino confía en ti, y el futuro de nuestra tierra descansa en el filo de tu espada.',
    'Así, valiente héroe, sal en busca de los secretos y las armas que puedan deshacer el hechizo. Que los vientos de la fortuna soplen a tu favor, y que la gloria sea tu recompensa. El reino aguarda tu regreso con ansias y esperanza, confiando en que traerás la paz y la luz de nuevo a nuestras tierras.',
    'Un momento....',
    'YA ESTÁN AQUÍ'
  ];
  private currentStoryIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showPregonero = true;
    }, 2000);

    setTimeout(() => {
      this.showBocadillo = true;
      this.dialogText = this.startText;
      document.addEventListener('click', this.handleClick.bind(this));
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }, 3000);
  }

  ngOnDestroy(): void {
    // Elimina el listener cuando el componente se destruya
    document.removeEventListener('click', this.handleClick.bind(this));
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  onEnter(): void {
    if (this.inputText.trim() === '') {
      if (this.dialogText === '¿sigues ahí?') {
        this.dialogText = 'no te oigo...';
      } else {
        this.dialogText = '¿sigues ahí?';
      }
    } else {
      this.updateParagraph();
      this.inputText = '';
      this.attemptCount++;
      if (this.attemptCount === 5) {
        this.dialogText = 'Imploro, no forceis mi lengua a desvelar secretos no deseados.';
      }
      if (this.attemptCount >= 9) {
        this.showBocadillo = false;
        this.handleMaxAttempts();
      }
    }
  }

  private updateParagraph(): void {
    if (this.availableParagraphs.length === 0) {
      this.availableParagraphs = [...this.paragraphs];
      this.usedParagraphs = [];
    }
    
    const randomIndex = Math.floor(Math.random() * this.availableParagraphs.length);
    this.dialogText = this.availableParagraphs[randomIndex];
    this.usedParagraphs.push(this.availableParagraphs[randomIndex]);
    this.availableParagraphs.splice(randomIndex, 1);
  }

  private handleMaxAttempts(): void {
    this.isStoryActive = true;
    this.currentStoryIndex = 0;
    this.dialogText = this.storyParts[this.currentStoryIndex];
  }

  private handleClick(): void {
    if (this.isStoryActive) {
      if (this.currentStoryIndex < this.storyParts.length - 1) {
        this.currentStoryIndex++;
        this.dialogText = this.storyParts[this.currentStoryIndex];
      } else {
        this.isStoryActive = false;
        this.finishedStory.emit();
      }
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  }

  refreshPage() {
    window.location.reload();
  }
}