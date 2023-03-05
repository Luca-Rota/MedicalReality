import { 
    InterventionRoom,
    InterventionType,
    CriticalityLevel,
    BodyType } from 'libs/common/src/enums';
import { IsOptional, IsEnum, IsString, IsBoolean, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CustomLessonDto {

    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description!: string;

    @IsEnum(BodyType)
    @Transform(({ value }) => parseInt(value))
    bodyType!: BodyType;

    @IsEnum(InterventionType)
    @Transform(({ value }) => parseInt(value))
    interventionType!: InterventionType;

    @IsEnum(CriticalityLevel)
    @Transform(({ value }) => parseInt(value))
    criticalityLevel!: CriticalityLevel;

    @IsEnum(InterventionRoom)
    @Transform(({ value }) => parseInt(value))
    interventionRoom!: InterventionRoom;

    @IsBoolean()
    timeTrial!: boolean;

    @IsBoolean()
    rewind!: boolean;

}

export class EvaluateTaskDto {

    @Min(1)
    @IsNumber()
    totalTime!: number;

    @Min(0)
    @IsNumber()
    totalErrors!: number;
}