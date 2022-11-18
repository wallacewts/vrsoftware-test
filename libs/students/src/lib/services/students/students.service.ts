import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '@vrsoftware/entities';
import { Repository } from 'typeorm';
import { CreateStudentDto } from '../../dtos/create-student.dto';

@Injectable()
export class StudentsService {
  readonly #logger = new Logger(StudentsService.name);

  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>
  ) {}

  async create({ name, courses }: CreateStudentDto): Promise<Student> {
    try {
      const studentArealdyExists = await this.studentsRepository.findOneBy({
        name: name,
      });

      if (studentArealdyExists) {
        throw new BadRequestException('Estudante já existe');
      }

      const student = this.studentsRepository.create({
        name,
        courses: [
          {
            id: courses[0],
          },
        ],
      });

      console.log(student);

      await this.studentsRepository.save(student);

      return student;
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException(
        'Erro ao tentar cadastrar aluno, por favor tente novamente mais tarde'
      );
    }
  }
}
