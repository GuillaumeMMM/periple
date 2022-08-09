import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriplePathsComponent } from './periple-paths.component';

describe('PeriplePathsComponent', () => {
  let component: PeriplePathsComponent;
  let fixture: ComponentFixture<PeriplePathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriplePathsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriplePathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
