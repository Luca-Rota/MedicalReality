import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm'
import { Grade } from '../enums';


@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
    })
    description!: string;

    @Column({
        type: 'smallint',
        nullable: true,
        default: null
    })
    grade!: Grade;

    /**
   * For TypeORM metadata only
   * @deprecated
   */
  __joiner?: any;

}