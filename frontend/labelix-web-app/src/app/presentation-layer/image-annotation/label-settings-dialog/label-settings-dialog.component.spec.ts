import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelSettingsDialogComponent } from './label-settings-dialog.component';

describe('LabelSettingsDialogComponent', () => {
  let component: LabelSettingsDialogComponent;
  let fixture: ComponentFixture<LabelSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
