import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [];

  constructor(private http: HttpClient) {
  }

  setBooks(books: Book[]) {
    this.books = books;
  }

  getBooks(): Book[] {
    console.log("Get book", this.books);
    return this.books;
  }

  onDelete(): void {
    console.log("Xoa book");
  }

  addBook(book: Book): Observable<Book> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Book>('http://localhost:3000/books', book, httpOptions);
  }
}
