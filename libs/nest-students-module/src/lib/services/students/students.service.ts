import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, IStudent, Student } from '@vrsoftware/entities';
import { In, Repository } from 'typeorm';
import { CreateStudentDto } from '../../dtos/create-student.dto';
import { UpdateStudentDto } from '../../dtos/update-student.dto';

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

  async update(id: string, { name }: UpdateStudentDto): Promise<Student> {
    try {
      let student = await this.studentsRepository.findOneBy({
        id,
      });

      if (!student) {
        throw new NotFoundException('Estudante não encontrado');
      }

      student.name = name;
      student = await this.studentsRepository.save(student);

      return student;
    } catch (error) {
      this.#logger.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao tentar atualizar perfil, por favor tente novamente mais tarde'
      );
    }
  }

  async getByName(name: string): Promise<Student> {
    try {
      const student = await this.studentsRepository.findOne({
        relations: {
          courses: true,
        },
        where: {
          name,
        },
      });

      if (!student) {
        throw new NotFoundException('Estudante não encontrado');
      }

      return student;
    } catch (error) {
      this.#logger.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao tentar buscar aluno, por favor tente novamente mais tarde'
      );
    }
  }

  async sync(student: Student): Promise<void> {
    await this.studentsRepository.save(student);
  }

  async getAll(): Promise<IStudent[]> {
    try {
      return await this.studentsRepository.find({
        relations: {
          courses: true,
        },
        order: {
          updated_at: 'desc',
        },
      });
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException(
        'Erro ao tentar buscar todos os estudantes, por favor tente novamente mais tarde'
      );
    }
  }
}
