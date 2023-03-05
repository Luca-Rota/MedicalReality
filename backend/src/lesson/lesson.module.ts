import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson, LessonTask, TaskTool, Tool, Task } from 'libs/common/src/entities';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
    imports: [TypeOrmModule.forFeature([Lesson,Tool,Task,LessonTask,TaskTool])],
    providers: [LessonService],
    controllers: [LessonController],
    exports: [LessonService],
  })
  export class LessonModule {}