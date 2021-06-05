import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTrainingsSequencies1621735167408
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trainings_sequencies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sequency_id',
            type: 'uuid',
          },
          {
            name: 'training_id',
            type: 'uuid',
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
      'trainings_sequencies',
      new TableForeignKey({
        name: 'Trainings_SequenciesSequencies',
        columnNames: ['sequency_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sequencies',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'trainings_sequencies',
      new TableForeignKey({
        name: 'Trainings_SequenciesTrainings',
        columnNames: ['training_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'trainings',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'trainings_sequencies',
      'Trainings_SequenciesSequencies',
    );
    await queryRunner.dropForeignKey(
      'trainings_sequencies',
      'Trainings_SequenciesTrainings',
    );
    await queryRunner.dropTable('trainings_sequencies');
  }
}
