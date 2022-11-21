import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, ICourse, IPagination } from '@vrsoftware/entities';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
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

  async update(
    id: string,
    { name, syllabus }: CreateCourseDto
  ): Promise<Course> {
    try {
      let course = await this.coursesRepository.findOneBy({
        id,
      });

      if (!course) {
        throw new NotFoundException('Curso não encontrado');
      }

      course.name = name;
      course.syllabus = syllabus;
      course = await this.coursesRepository.save(course);

      return course;
    } catch (error) {
      this.#logger.error(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Erro ao tentar atualizar um curso, por favor tente novamente mais tarde'
      );
    }
  }

  async getAll(
    paginateOptions: IPaginationOptions
  ): Promise<IPagination<ICourse>> {
    try {
      const queryBuilder = this.coursesRepository.createQueryBuilder('c');
      queryBuilder.orderBy('c.updated_at', 'DESC');

      return await paginate<Course>(queryBuilder, paginateOptions);
    } catch (error) {
      this.#logger.error(error);
      throw new InternalServerErrorException(
        'Erro ao tentar buscar todos os cursos, por favor tente novamente mais tarde'
      );
    }
  }

  async sync(course: Course): Promise<void> {
    await this.coursesRepository.save(course);
  }
}
