import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API_URL = 'http://localhost:3000/books';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL).pipe(
      tap(_ => console.log('fetched books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  /** GET book by id. Will 404 if id not found */
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/${id}`).pipe(
      tap(_ => console.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>('getBook'))
    );
  }

  /** POST: add a new book to the server */
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API_URL, book).pipe(
      tap((newBook: Book) => console.log(`added book w/ id=${newBook.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /** PUT: update the book on the server */
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.API_URL}/${book.id}`, book).pipe(
      tap(_ => console.log(`updated book id=${book.id}`)),
      catchError(this.handleError<Book>('updateBook'))
    );
  }

  /** DELETE: delete the book from the server */
  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    return this.http.delete<Book>(`${this.API_URL}/${id}`).pipe(
      tap(_ => console.log(`deleted book id = ${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
