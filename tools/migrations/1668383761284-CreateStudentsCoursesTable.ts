import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStudentsCoursesTable1668383761284
  implements MigrationInterface
{
  #tableName = 'students_courses';
  #foreignKeys = [
    new TableForeignKey({
      name: 'fk_students_courses_students_student_id',
      columnNames: ['student_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'students',
    }),
    new TableForeignKey({
      name: 'fk_students_courses_courses_course_id',
      columnNames: ['course_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'courses',
    }),
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.#tableName,
        columns: [
          {
            name: 'student_id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'course_id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKeys(this.#tableName, this.#foreignKeys);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.#tableName, this.#foreignKeys);
    await queryRunner.dropTable(this.#tableName);
  }
}
