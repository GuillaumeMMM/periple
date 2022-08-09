import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriplePathsNodeComponent } from './periple-paths-node.component';

describe('PeriplePathsNodeComponent', () => {
  let component: PeriplePathsNodeComponent;
  let fixture: ComponentFixture<PeriplePathsNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriplePathsNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriplePathsNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
