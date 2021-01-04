import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiConfigSettingsComponent } from './ai-config-settings.component';

describe('AiConfigSettingsComponent', () => {
  let component: AiConfigSettingsComponent;
  let fixture: ComponentFixture<AiConfigSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiConfigSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiConfigSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
