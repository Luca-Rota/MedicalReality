import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from './lesson/lesson.module';
import { AppTypeormOptionsModule } from 'libs/common/src/db';
import { typeormOptions } from 'libs/common/src/db';
import { AppTypeormOptionsService } from 'libs/common/src/db';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        AppTypeormOptionsModule.forRoot({
          ...typeormOptions,
        }),
      ],
      useExisting: AppTypeormOptionsService,
    }),
    LessonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
