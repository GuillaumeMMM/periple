import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeripleNetworkComponent } from './periple-network.component';

describe('PeripleNetworkComponent', () => {
  let component: PeripleNetworkComponent;
  let fixture: ComponentFixture<PeripleNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeripleNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeripleNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
