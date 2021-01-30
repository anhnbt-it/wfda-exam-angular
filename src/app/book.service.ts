import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books');
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>('http://localhost:3000/books/' + id);
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>('http://localhost:3000/books/' + id);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>('http://localhost:3000/books', book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>('http://localhost:3000/books/' + book.id, book);
  }
}
