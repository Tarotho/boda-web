import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mistery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mistery.component.html',
  styleUrls: ['./mistery.component.css']
})
export class MisteryComponent implements OnInit, OnDestroy {
  targetDate: Date = new Date('2024-09-01T00:00:00');
  countdown$ = interval(1000).pipe(
    startWith(0),
    map(() => this.calculateCountdown())
  );
  countdownSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.countdownSubscription = this.countdown$.subscribe();
    this.startMorseAnimationWithInitialDelay('. ... .--. . .-. .-', 10000, 10000); 
   }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  private calculateCountdown(): { days: string; hours: string; minutes: string; seconds: string } | null {
    const now = new Date();
    const timeDiff = this.targetDate.getTime() - now.getTime();

    if (timeDiff <= 0) {
      this.handleCountdownFinished();
      return null;
    }

    const seconds = Math.floor(timeDiff / 1000);
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return {
      days: this.convertToDevanagari(days),
      hours: this.convertToDevanagari(hours),
      minutes: this.convertToDevanagari(minutes),
      seconds: this.convertToDevanagari(remainingSeconds)
    };
  }

  private convertToDevanagari(num: number): string {
    const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num.toString().split('').map(digit => devanagariDigits[parseInt(digit, 10)]).join('');
  }

  private handleCountdownFinished(): void {
    this.router.navigate(['/']);
  }

  private startMorseAnimationWithInitialDelay(morseCode: string, initialDelay: number, repeatAfter: number): void {
    setTimeout(() => {
      this.startMorseAnimationWithRepeat(morseCode, repeatAfter);
    }, initialDelay);
  }

  private startMorseAnimationWithRepeat(morseCode: string, repeatAfter: number): void {
    const animationSequence = this.generateMorseAnimation(morseCode);
    this.applyMorseAnimation(animationSequence, repeatAfter);
  }

  private generateMorseAnimation(morseCode: string): number[] {
    const unit = 400; // Duration of a dot or dash in ms
    const space = 3000; // Space duration between symbols in ms
    const pause = 50;

    let sequence: number[] = [];

    for (const char of morseCode) {
      if (char === '.') {
        sequence.push(unit);
      } else if (char === '-') {
        sequence.push(unit * 3);
      } else if (char === ' ') {
        sequence.push(space);
      }
      sequence.push(pause);
    }

    return sequence;
  }

  private applyMorseAnimation(sequence: number[], repeatAfter: number): void {
    const elements = document.querySelectorAll('.morse-pulse');
    let totalDuration = 0;

    const animate = () => {
      sequence.forEach((duration) => {
        setTimeout(() => {
          elements.forEach(element => {
            element.classList.add('morse-pulse');
          });
        }, totalDuration);

        totalDuration += duration;

        setTimeout(() => {
          elements.forEach(element => {
            element.classList.remove('morse-pulse');
          });
        }, totalDuration);

        totalDuration += duration; // Adding space duration
      });

      // Schedule the next repeat
      setTimeout(() => {
        animate();
      }, repeatAfter);
    };

    animate();
  }
}
