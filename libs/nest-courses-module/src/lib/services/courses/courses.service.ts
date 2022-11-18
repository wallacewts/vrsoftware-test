import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '@vrsoftware/entities';
import { Repository } from 'typeorm';
import { CreateCourseDto } from '../../dtos/create-course.dto';

@Injectable()
export class CoursesService {
  readonly #logger = new Logger(CoursesService.name);

  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>
  ) {}

  async create({ name, syllabus }: CreateCourseDto): Promise<Course> {
    try {
      const courseAlreadyExists = await this.coursesRepository.findOneBy({
        name,
      });

      if (courseAlreadyExists) {
        throw new BadRequestException('Curso já cadastrado');
      }

      let course = this.coursesRepository.create({
        name,
        syllabus,
      });

      course = await this.coursesRepository.save(course);

      return course;
    } catch (error) {
      this.#logger.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao tentar cadastrar um curso, por favor tente novamente mais tarde'
      );
    }
  }
}
