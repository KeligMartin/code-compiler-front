import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementAdminComponent } from './statement-admin.component';

describe('StatementAdminComponent', () => {
  let component: StatementAdminComponent;
  let fixture: ComponentFixture<StatementAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
