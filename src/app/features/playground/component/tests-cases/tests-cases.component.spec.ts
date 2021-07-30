import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsCasesComponent } from './tests-cases.component';

describe('TestsCasesComponent', () => {
  let component: TestsCasesComponent;
  let fixture: ComponentFixture<TestsCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestsCasesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
