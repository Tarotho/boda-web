import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregoneroComponent } from './pregonero.component';

describe('PregoneroComponent', () => {
  let component: PregoneroComponent;
  let fixture: ComponentFixture<PregoneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PregoneroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregoneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
