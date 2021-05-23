import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTrainings1621735167408
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trainings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'instructor_id',
            type: 'uuid',
          },
          {
            name: 'student_id',
            type: 'uuid',
          },
          {
            name: 'days',
            type: 'integer[]',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'trainings',
      new TableForeignKey({
        name: 'TrainingStudent',
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'trainings',
      new TableForeignKey({
        name: 'TrainingInstructor',
        columnNames: ['instructor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('trainings', 'TrainingStudent');
    await queryRunner.dropForeignKey('trainings', 'TrainingInstructor');
    await queryRunner.dropTable('trainings');
  }
}
