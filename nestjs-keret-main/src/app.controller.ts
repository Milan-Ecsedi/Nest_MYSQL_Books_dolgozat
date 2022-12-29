import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BookDto } from './book.dto';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/")
  @Render('list')
  async listBooks() {
    const [rows] = await db.execute(
      'SELECT * FROM `books` WHERE 1 ORDER by rating DESC;'
    );

    return {
      books: rows,
    };
  }

  


  @Get('books/new')
  @Render('new')
  newBookForm() {
    return {};
  }

  @Post('books/new')
  @Redirect()
  async newBook(@Body() book: BookDto) {
    
    const []: any = await db.execute(
      'INSERT INTO books (title, rating) VALUES (?, ?)',
      [book.title, book.rating],
    );
    return {
      url: '/',
    };
  }

}
