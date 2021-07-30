import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelStatementTabsComponent } from './level-statement-tabs.component';

describe('LevelStatementTabsComponent', () => {
  let component: LevelStatementTabsComponent;
  let fixture: ComponentFixture<LevelStatementTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelStatementTabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelStatementTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
