import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookForm = this.fb.group({
    id: null,
    title: [null, Validators.required],
    author: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = Number(routeParams.get('id'));

    this.bookService.getBook(bookIdFromRoute).subscribe((data: Book) => {
      this.bookForm = this.fb.group({
        id: data.id,
        title: [data.title, Validators.required],
        author: [data.author, Validators.required],
        description: [data.description, Validators.required],
      });
    });  }

  onSubmit(): void {
    this.bookService.updateBook(this.bookForm.value).subscribe(data => console.log(data));
    this.router.navigateByUrl("/books");
  }

}
