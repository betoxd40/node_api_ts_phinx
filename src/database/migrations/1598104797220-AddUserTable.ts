import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm'

export class AddUserTable1598104797220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'dni',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'age',
            type: 'integer',
            isNullable: false
          },
          {
            name: 'phone',
            type: 'integer',
            isNullable: false
          }
        ]
      }),
      true
    )

    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({ name: 'USERS_EMAIL_UN', columnNames: ['email'] })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('users')
  }
}
