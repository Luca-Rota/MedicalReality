import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm'
import { Grade,
LessonDifficulty,
// InterventionRoom,
// InterventionType,
// CriticalityLevel,
// BodyType,
// LessonType
 } from '../enums';

@Entity('lessons')
export class Lesson {

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
        nullable: true,
        default: null
    })
    description!: string;

    @Column({
        type: 'smallint',
        nullable: false,
    })
    lessonDifficulty!: LessonDifficulty;

    // @Column({
    //     type: 'smallint',
    //     nullable: false,
    // })
    // bodyType!: BodyType;

    // @Column({
    //     type: 'smallint',
    //     nullable: false,
    // })
    // interventionType!: InterventionType;

    // @Column({
    //     type: 'smallint',
    //     nullable: false,
    // })
    // criticalityLevel!: CriticalityLevel;

    // @Column({
    //     type: 'smallint',
    //     nullable: false,
    // })
    // interventionRoom!: InterventionRoom;

    // @Column({
    //     type: 'boolean',
    //     nullable: false,
    // })
    // timeTrial!: boolean;

    // @Column({
    //     type: 'boolean',
    //     nullable: false,
    // })
    // rewind!: boolean;

    @Column({
        type: 'smallint',
        nullable: true,
        default: null
    })
    grade!: Grade;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true,
        default: null
    })
    feedback!: string;

    // @Column({
    //     type: 'smallint',
    //     nullable: false,
    // })
    // lessonType!: LessonType;

    @Column({
         type: 'boolean',
         nullable: false,
         default: false
    })
    shared!: boolean;

    /**
   * For TypeORM metadata only
   * @deprecated
   */
  __joiner?: any;

}