import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSidenavComponent } from './application-sidenav.component';

describe('ApplicationSidenavComponent', () => {
  let component: ApplicationSidenavComponent;
  let fixture: ComponentFixture<ApplicationSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
