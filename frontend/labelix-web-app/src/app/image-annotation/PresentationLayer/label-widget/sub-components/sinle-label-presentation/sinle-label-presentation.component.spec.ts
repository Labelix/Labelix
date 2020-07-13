import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinleLabelPresentationComponent } from './sinle-label-presentation.component';

describe('SinleLabelPresentationComponent', () => {
  let component: SinleLabelPresentationComponent;
  let fixture: ComponentFixture<SinleLabelPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinleLabelPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinleLabelPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
