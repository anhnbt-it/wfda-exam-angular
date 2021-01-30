import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  book!: Book;

  bookForm = this.fb.group({
    id: null,
    title: [null, Validators.required],
    author: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
    ) { }

    ngOnInit(): void {
      // First get the product id from the current route.
      const routeParams = this.route.snapshot.paramMap;
      const bookIdFromRoute = Number(routeParams.get('id'));
  
      // Find the product that correspond with the id provided in route.
      // http://localhost:3000/books/1
      this.http.get<Book>('http://localhost:3000/books/' + bookIdFromRoute).subscribe((data: Book) => {
        this.book = data;
        console.log(this.book);
        this.bookForm = this.fb.group({
          id: this.book.id,
          title: [this.book.title, Validators.required],
          author: [this.book.author, Validators.required],
          description: [this.book.description, Validators.required],
        });
      });
    }

  onSubmit(): void {
    this.updateBook(this.bookForm.value);
    console.log("Update: ", this.updateBook(this.bookForm.value));
    this.router.navigateByUrl("/");
  }

  updateBook(book: Book): any {
    return this.http.put<Book>('http://localhost:3000/books/' + book.id, book).subscribe((res: any) => {console.log(res)});
  }

}
