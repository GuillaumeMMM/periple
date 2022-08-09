import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripleProfileComponent } from './periple-profile.component';

describe('PeripleProfileComponent', () => {
  let component: PeripleProfileComponent;
  let fixture: ComponentFixture<PeripleProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripleProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeripleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
