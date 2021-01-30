import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = Number(routeParams.get('id'));
    this.bookService.getBook(bookIdFromRoute).subscribe(book => this.book = book);
  }

}
