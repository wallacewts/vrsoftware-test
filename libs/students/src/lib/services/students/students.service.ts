import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Student } from '@vrsoftware/entities';
import { In, Repository } from 'typeorm';
import { CreateStudentDto } from '../../dtos/create-student.dto';

@Injectable()
export class StudentsService {
  readonly #logger = new Logger(StudentsService.name);

  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>
  ) {}

  async create({ name, courseIds }: CreateStudentDto): Promise<Student> {
    try {
      const studentArealdyExists = await this.studentsRepository.findOneBy({
        name,
      });

      if (studentArealdyExists) {
        throw new BadRequestException('Estudante já existe');
      }

      const courses = await this.coursesRepository.findBy({
        id: In(courseIds),
      });

      if (courses.length === 0) {
        throw new NotFoundException('Nenhum curso encontrado');
      }

      const student = this.studentsRepository.create({
        name,
        courses,
      });

      await this.studentsRepository.save(student);

      return student;
    } catch (error) {
      this.#logger.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao tentar cadastrar aluno, por favor tente novamente mais tarde'
      );
    }
  }
}
