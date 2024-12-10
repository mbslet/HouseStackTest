import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/notes-db'), // Substitua pelo URI do MongoDB
    NotesModule,
  ],
})
export class AppModule {}
