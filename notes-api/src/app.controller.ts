import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { NotesService } from './notes/notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: { title: string; content: string }) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  async findAll(@Query('createdAt') createdAt?: string) {
    console.log(createdAt);
    if (createdAt) {
      try {
        return await this.notesService.findByDate(createdAt);
      } catch (error) {
        // If the date is invalid, we return an error response
        throw new BadRequestException('Invalid date format');
      }
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: { title?: string; content?: string }) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
