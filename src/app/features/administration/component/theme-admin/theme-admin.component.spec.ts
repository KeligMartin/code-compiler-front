import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeAdminComponent } from './theme-admin.component';

describe('ThemeAdminComponent', () => {
  let component: ThemeAdminComponent;
  let fixture: ComponentFixture<ThemeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
