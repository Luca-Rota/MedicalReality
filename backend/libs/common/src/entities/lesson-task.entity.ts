import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { FOREIGN_OPTIONS_CASCADE } from '../constants';

import { Lesson } from './lesson.entity';
import { Task } from './task.entity';

@Entity('lessons-tasks')
export class LessonTask {
  @PrimaryColumn({
    type: 'integer',
    nullable: false,
  })
  lessonId!: number;

  @PrimaryColumn({
    type: 'integer',
    nullable: false,
  })
  taskId!: number;

  /**
   * TypeORM sql-gen only
   * @deprecated
   */
  @ManyToOne(() => Lesson, (entity) => entity.__joiner, FOREIGN_OPTIONS_CASCADE)
  @JoinColumn({
    name: 'lessonId',
    referencedColumnName: 'id',
  })
  lesson?: Lesson;

  /**
   * TypeORM sql-gen only
   * @deprecated
   */
  @ManyToOne(() => Task, (entity) => entity.__joiner, FOREIGN_OPTIONS_CASCADE)
  @JoinColumn({
    name: 'taskId',
    referencedColumnName: 'id',
  })
  task?: Task;
}
