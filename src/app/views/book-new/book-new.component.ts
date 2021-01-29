import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css']
})
export class BookNewComponent implements OnInit {

  bookForm = this.fb.group({
    id: null,
    title: [null, Validators.required],
    author: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private bookService: BookService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("Save", this.bookForm.value);
    this.addBook(this.bookForm.value);
    this.router.navigateByUrl("/");
  }

  addBook(book: Book): any {
    return this.http.post<Book>('http://localhost:3000/books', book).subscribe((res: any) => {console.log(res)});
  }

}
