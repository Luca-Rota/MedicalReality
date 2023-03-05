import { Param, Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { LessonService } from './lesson.service';
import { Lesson } from 'libs/common/src/entities';
import { CustomLessonDto, EvaluateTaskDto } from './lesson.dto';

@Controller('lessons')
export class LessonController {
    constructor(private lessonService: LessonService) {}

    @Get('professor')
    @HttpCode(200)
    async getAllProfessorLessons(): Promise<Lesson[]> {
        return await this.lessonService.getAllProfessorLessons();
    }

    @Get('tips')
    @HttpCode(200)
    async getTips(): Promise<Lesson[]> {
        return await this.lessonService.getTips();
    }

    // @Get('custom')
    // @HttpCode(200)
    // async getAllCustomLessons(): Promise<Lesson[]> {
    //     return await this.lessonService.getAllCustomLessons();
    // }

    @Get(':id')
    @HttpCode(200)
    async getLessonDetails(@Param('id') id:number) {
        return await this.lessonService.getLessonDetails(id);
    }

    // @Post('new_custom')
    // @HttpCode(201)
    // async createCustomLesson(@Body() body: CustomLessonDto) {
    //     return await this.lessonService.createCustomLesson(body);
    // }

    @Post('evaluate_task/:id')
    @HttpCode(201)
    async evaluateTask(@Param('id') id: number, @Body() body: EvaluateTaskDto) {
        return await this.lessonService.assignGradeToTask(id, body);
    }

    @Post('evaluate_lesson/:id')
    @HttpCode(201)
    async evaluateLesson(@Param('id') id: number) {
        return await this.lessonService.assignGradeToLesson(id);
    }

    @Post('reset/:id')
    @HttpCode(201)
    async resetLessonGrade(@Param('id') id: number) {
        return await this.lessonService.resetLessonGrade(id);
    }

    @Post('share/:id')
    @HttpCode(201)
    async shareLessonResults(@Param('id') id: number) {
        return await this.lessonService.shareLessonResult(id);
    }
}