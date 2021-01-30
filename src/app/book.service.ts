import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API_URL = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/${id}`);
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(`${this.API_URL}/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.API_URL}/${book.id}`, book);
  }
}
