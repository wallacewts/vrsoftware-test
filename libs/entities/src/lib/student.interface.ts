import { ICourse } from './course.interface';

export class IStudent {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  courses: ICourse[];
}
