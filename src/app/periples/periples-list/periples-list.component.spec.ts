import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriplesListComponent } from './periples-list.component';

describe('PeriplesListComponent', () => {
  let component: PeriplesListComponent;
  let fixture: ComponentFixture<PeriplesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriplesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriplesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
