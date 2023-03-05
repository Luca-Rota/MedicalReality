import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm'


@Entity('tools')
export class Tool {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    name!: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
    })
    description!: string;

        /**
   * For TypeORM metadata only
   * @deprecated
   */
  __joiner?: any;
}