import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CodeQuality } from '../../../../models/code-quality.model';
import { CodeQualityService } from '../../../../services/code-quality/code-quality.service';
import { first } from 'rxjs/operators';
import { UserResponse } from '../../../../models/UserResponse.model';
import { Language } from '../../../../enums/language.enum';

@Component({
  selector: 'app-code-quality',
  templateUrl: './code-quality.component.html',
  styleUrls: ['./code-quality.component.scss'],
})
export class CodeQualityComponent implements OnInit, OnChanges {
  @Input() codeQualityId: string;
  @Input() userResponses: UserResponse[];
  @Input() language: Language;
  codeQuality: CodeQuality;
  constructor(private codeQualityService: CodeQualityService) {}

  ngOnInit(): void {
    this.initCodeQuality();
  }

  getCodeQuality(codeQualityId: string): void {
    this.codeQualityService
      .getCodeQuality(codeQualityId)
      .pipe(first())
      .subscribe((codeQuality) => {
        this.codeQuality = codeQuality;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.codeQualityId) {
      this.codeQualityId = changes.codeQualityId.currentValue;
      this.getCodeQuality(this.codeQualityId);
      this.getStatus();
    }
    if (changes.language) {
      this.language = changes.language.currentValue;
      this.initCodeQuality();
    }
  }

  getStatus(): string {
    return this.codeQuality?.status.toString();
  }

  initCodeQuality(): void {
    const userResponse = this.userResponses.find(ur => ur.language === this.language);
    if (userResponse !== undefined && userResponse.idUserResponse !== undefined) {
      this.codeQualityService.getLastCodeQualityByUserResponseId(userResponse.idUserResponse)
        .subscribe((res) => {
          this.codeQuality = res;
        });
    }
  }
}
