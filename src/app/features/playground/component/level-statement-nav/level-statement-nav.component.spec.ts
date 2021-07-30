import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelStatementNavComponent } from './level-statement-nav.component';

describe('LevelStatementNavComponent', () => {
  let component: LevelStatementNavComponent;
  let fixture: ComponentFixture<LevelStatementNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelStatementNavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelStatementNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
