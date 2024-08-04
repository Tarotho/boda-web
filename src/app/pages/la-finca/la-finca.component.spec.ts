import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaFincaComponent } from './la-finca.component';

describe('LaFincaComponent', () => {
  let component: LaFincaComponent;
  let fixture: ComponentFixture<LaFincaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaFincaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaFincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
