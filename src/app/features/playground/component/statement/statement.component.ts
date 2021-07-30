import { Component, Input, OnInit } from '@angular/core';
import { Statement } from '../../../../models/Statement.model';
import { StatementService } from '../../../../services/statement/statement.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit {
  @Input() statement: Statement | undefined;
  statements: Statement[] = [];
  constructor(private statementService: StatementService) {}

  ngOnInit(): void {}
}
