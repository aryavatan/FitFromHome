import { Class } from '../explore/class.model';

export class Profile {
    fullName: string;
    id: string;
    classId: string;
    category: string;
    description: string;
    isTrainer: boolean;
  }

export class TrainersClassList{
    classes: Class;
}