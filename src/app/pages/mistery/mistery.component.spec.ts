import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisteryComponent } from './mistery.component';

describe('MisteryComponent', () => {
  let component: MisteryComponent;
  let fixture: ComponentFixture<MisteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisteryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
