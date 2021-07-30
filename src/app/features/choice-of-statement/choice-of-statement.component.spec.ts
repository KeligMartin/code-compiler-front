import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceOfStatementComponent } from './choice-of-statement.component';

describe('ChoiceOfStatementComponent', () => {
  let component: ChoiceOfStatementComponent;
  let fixture: ComponentFixture<ChoiceOfStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoiceOfStatementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceOfStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
