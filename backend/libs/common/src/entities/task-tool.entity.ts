import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { FOREIGN_OPTIONS_CASCADE } from '../constants';

import { Task } from './task.entity';
import { Tool } from './tool.entity';

@Entity('tasks-tools')
export class TaskTool {

  @PrimaryColumn({
    type: 'integer',
    nullable: false,
  })
  taskId!: number;

  @PrimaryColumn({
    type: 'integer',
    nullable: false,
  })
  toolId!: number;


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

    /**
   * TypeORM sql-gen only
   * @deprecated
   */
  @ManyToOne(() => Tool, (entity) => entity.__joiner, FOREIGN_OPTIONS_CASCADE)
  @JoinColumn({
    name: 'toolId',
    referencedColumnName: 'id',
  })
  tool?: Tool;
}