import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = Number(routeParams.get('id'));
    this.bookService.getBook(bookIdFromRoute).subscribe(book => {
      this.book = book,
      console.log(book);
    });
  }

  onDelete(): void {
    if (this.book != undefined && this.book.id != undefined) {
      this.bookService.deleteBook(this.book.id).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

}
