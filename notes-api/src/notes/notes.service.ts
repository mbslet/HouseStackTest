import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: Partial<Note>): Promise<Note> {
    const newNote = new this.noteModel(createNoteDto);
    return newNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByDate(date: string): Promise<Note[]> {
    const parsedDate = new Date(date);

    // Verificando se a data é válida
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }

    // Fazendo a comparação de datas, considerando apenas a data (hora:00:00:00)
    const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

    return this.noteModel
      .find({
        createdAt: {
          $gte: startOfDay,  // Maior ou igual ao início do dia
          $lt: endOfDay,     // Menor que o final do dia
        },
      })
      .exec();
  }

  async update(id: string, updateNoteDto: Partial<Note>): Promise<Note> {
    const updatedNote = await this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .exec();

    if (!updatedNote) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return updatedNote;
  }

  async remove(id: string): Promise<void> {
    const result = await this.noteModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Note #${id} not found`);
    }
  }
}

