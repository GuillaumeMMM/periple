import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriplesComponent } from './periples.component';

describe('PeriplesComponent', () => {
  let component: PeriplesComponent;
  let fixture: ComponentFixture<PeriplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
