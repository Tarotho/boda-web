import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShivaComponent } from './shiva.component';

describe('ShivaComponent', () => {
  let component: ShivaComponent;
  let fixture: ComponentFixture<ShivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShivaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
