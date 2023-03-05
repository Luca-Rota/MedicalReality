import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Lesson, LessonTask, Task, TaskTool, Tool } from 'libs/common/src/entities';
import { Grade, LessonType } from 'libs/common/src/enums';
import { CustomLessonDto, EvaluateTaskDto } from './lesson.dto';
import { HttpException } from '@nestjs/common';

export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>,
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(Tool)
        private toolRepository: Repository<Tool>,
        @InjectRepository(LessonTask)
        private lessonTaskRepository: Repository<LessonTask>,
        @InjectRepository(TaskTool)
        private taskToolRepository: Repository<TaskTool>

    ) {}

    async getAllProfessorLessons(): Promise<Lesson[]> {

      const lessons = await this.lessonRepository
        .createQueryBuilder('l')
        // .where('l.lessonType = :lessonType', {lessonType: LessonType.professor})
        .orderBy('id')
        .getMany()

        return lessons
    }

    // async getAllCustomLessons(): Promise<Lesson[]> {

    //     const lessons = await this.lessonRepository
    //       .createQueryBuilder('l')
    //       .where('l.lessonType = :lessonType', {lessonType: LessonType.custom})
    //       .orderBy('id')
    //       .getMany()
  
    //       return lessons
    // }

    // async createCustomLesson(body: CustomLessonDto) {

    //     let difficulty = (body.bodyType + body.criticalityLevel + body.interventionRoom + body.interventionType) / 4
    //     if(body.rewind)
    //         difficulty -= 1
    //     if(body.timeTrial && difficulty < 5)
    //         difficulty += 1

    //     const lesson = await this.lessonRepository.save({
    //         ...body,
    //         lessonType: LessonType.custom,
    //         lessonDifficulty: Math.floor(difficulty)
    //     })
    //     return lesson;
    // }

    async getLessonDetails(lessonId: number) {

      const lesson = await this.lessonRepository.findOneBy({ id: lessonId})
      if(lesson === null) throw new HttpException("Lesson not found", 404)

      const tasks = await this.lessonTaskRepository
      .createQueryBuilder('lt')
      .where('lt.lessonId = :lessonId', {lessonId: lesson.id})
      .orderBy('lt.taskId')
      .leftJoinAndMapOne('lt.taskId', Task, 't', 't.id = lt.taskId')  
      .getMany()
      .then((tasks) => tasks
        .map((t) => t.taskId))

      const tasksIds = await this.lessonTaskRepository
      .createQueryBuilder('lt')
      .where('lt.lessonId = :lessonId', {lessonId: lesson.id})
      .getMany()
      .then((tasks) => tasks
        .map((t) => t.taskId))

      const taskTools = await this.taskToolRepository.findBy({taskId: In(tasksIds)}).then((tt) => {
        return tt.map((tt) => tt.toolId).sort((a,b) => a - b)
      })

      const tools = []

      for(const tt of taskTools) {
        const tool = await this.toolRepository
        .createQueryBuilder('t')
        .where('t.id = :toolId', {toolId: tt})
        .getOne()

        tools.push(tool)
      }

      const fullLesson = {
        ...lesson,
        tasks,
        tools
      }

      return fullLesson
    }

    async assignGradeToTask(taskId: number, body: EvaluateTaskDto) {
      let task = await this.taskRepository.findOneBy({ id: taskId})
      if(task.grade !== null) throw new HttpException("Task already evaluated", 422)

      let grade = Grade.A;

      const factorTime = Math.floor(body.totalTime / 30)
      const factorErrors = body.totalErrors

      grade = grade - factorTime - factorErrors
      if(grade < 1)
        grade = 1

      task = await this.taskRepository.save({
        ...task,
        grade: grade
      })

      return task
    }

    async assignGradeToLesson(lessonId: number) {
      let lesson = await this.lessonRepository.findOneBy({ id: lessonId})
      if(lesson === null) throw new HttpException("Lesson not found", 404)
      if(lesson.grade !== null) throw new HttpException("Lesson already evaluated", 422)

      const tasksIds = await this.lessonTaskRepository
      .createQueryBuilder('lt')
      .where('lt.lessonId = :lessonId', {lessonId: lesson.id})
      .getMany()
      .then((tasks) => tasks
        .map((t) => t.taskId))

      var grades = []

        for(const id of tasksIds) {
          const task = await this.taskRepository.findOneBy({ id })
          if(task.grade === null) throw new HttpException("You must complete all the tasks for this lesson", 422)
          
          grades.push(task.grade)
        }

      const finalGrade = Math.floor(grades.reduce((a,b) => a + b, 0) / grades.length)

      lesson = await this.lessonRepository.save({
        ...lesson,
        grade: finalGrade
      })

      return lesson
    }

    async resetLessonGrade(lessonId: number) {
      let lesson = await this.lessonRepository.findOneBy({ id: lessonId})
      if(lesson === null) throw new HttpException("Lesson not found", 404)

      const tasksIds = await this.lessonTaskRepository
      .createQueryBuilder('lt')
      .where('lt.lessonId = :lessonId', {lessonId: lesson.id})
      .getMany()
      .then((tasks) => tasks
        .map((t) => t.taskId))

      for(const id of tasksIds) {
        const task = await this.taskRepository.findOneBy({ id })
        if(task.grade !== null)
          await this.taskRepository.save({
            ...task,
            grade: null
          })      
      }

      if(lesson.grade !== null) {
        lesson = await this.lessonRepository.save({
          ...lesson,
          grade: null,
          shared: false
        })
      }
    
      return lesson;
    }

    async getTips(): Promise<Lesson[]> {

      const worstLessons = await this.lessonRepository
      .createQueryBuilder('l')
      .where((qb) => {
        const subQuery = qb
            .subQuery()
            .select("MIN(l.grade)")
            .from(Lesson, "l")
            .getQuery()
        return "l.grade IN " + subQuery
      })
      .getMany()

      if(worstLessons.length === 0) throw new HttpException("You still have no completed lesson", 422)

      const lessonTarget = worstLessons[~~(Math.random() * worstLessons.length)]

      const lessonTargetTasksIds = await this.lessonTaskRepository
      .createQueryBuilder('lt')
      .where('lt.lessonId = :lessonId', {lessonId: lessonTarget.id})
      .getMany()
      .then((tasks) => tasks
        .map((t) => t.taskId)
        .sort((a,b) => a - b)
      )

      var lessonTargetTasks = []

      for(const id of lessonTargetTasksIds) {
        const task = await this.taskRepository.findOneBy({ id })
        if(task.grade === null) throw new HttpException("You still have no completed lesson", 422)
        lessonTargetTasks.push(task)
      }

      if(lessonTargetTasks.length > 4) {
        lessonTargetTasks = lessonTargetTasks.sort((a,b) => a.grade - b.grade).slice(0,3)
      }
      
      let tips: Lesson[] = []
      const lessons = await this.getAllProfessorLessons()

      lessonTargetTasks.forEach((t) => {
        if(t.description.includes('body temperature'))
          tips.push(lessons[5])
        if(t.description.includes('heart rate'))
          tips.push(lessons[6])
        if(t.description.includes('blood pressure'))
          tips.push(lessons[7])
        if(t.description.includes('disinfect'))
          tips.push(lessons[11])
        if(t.description.includes('syringe') && t.description.includes('blood'))
          tips.push(lessons[12])
        if(t.description.includes('Apply the bandaid'))
          tips.push(lessons[13])
      })
    
      return tips.sort((a,b) => a.id - b.id)
    }

    async shareLessonResult(lessonId: number) {
      let lesson = await this.lessonRepository.findOneBy({ id: lessonId})
      if(lesson === null) throw new HttpException("Lesson not found", 404)
      if(lesson.shared === true) throw new HttpException("Lesson results already shared with the professor", 422)
      if(lesson.grade === null) throw new HttpException("You need to complete the lesson before to share results with the professor", 422)

      lesson = await this.lessonRepository.save({
        ...lesson,
        shared: true
      })

      return lesson
    }
}