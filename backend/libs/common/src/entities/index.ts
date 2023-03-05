import { Lesson } from "./lesson.entity";
import { Tool } from "./tool.entity";
import { Task } from "./task.entity";
import { LessonTask } from "./lesson-task.entity";
import { TaskTool } from "./task-tool.entity";

export * from "./lesson.entity";
export * from "./tool.entity";
export * from "./task.entity";
export * from "./lesson-task.entity"
export * from "./task-tool.entity"

export const entities = [
    Lesson,
    Tool,
    Task,
    LessonTask,
    TaskTool
]