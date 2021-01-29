import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  displayedColumns: string[] = ['id', 'title', 'author', 'actions'];

  constructor(
    private http: HttpClient,
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    console.log("Init...");
    this.http.get<Book[]>('http://localhost:3000/books').subscribe((data: Book[]) => {
      this.books = data;
      this.bookService.setBooks(this.books);
    });
  }

  onDelete(): void {
    console.log("Xoa book");
  }

}
