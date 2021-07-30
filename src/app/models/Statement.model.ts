import { Theme } from './Theme.model';
import { Level } from './Level.model';
import { UserResponseService } from '../services/userResponse/user-response.service';
import { UserResponse } from './UserResponse.model';

export interface Statement {
  idStatement: string;
  description: string;
  theme: Theme;
  title: string;
  outputFile: string;
  level: Level;
  userResponses: UserResponse[];
  createdAt: Date;
}
