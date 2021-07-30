import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-choice-of-statement',
  templateUrl: './choice-of-statement.component.html',
  styleUrls: ['./choice-of-statement.component.scss'],
})
export class ChoiceOfStatementComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
