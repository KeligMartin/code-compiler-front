import {Status} from '../enums/status.enum';

export interface CodeQuality {
  idCodeQuality?: string;
  errors: string[];
  date: Date;
  gain: number;
  status: Status;
  userResponseId: string;
}
