import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/book';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = Number(routeParams.get('id'));

    // Find the product that correspond with the id provided in route.
    // http://localhost:3000/books/1
    this.http.get<Book>('http://localhost:3000/books/' + bookIdFromRoute).subscribe((data: Book) => {
      this.book = data;
      console.log(this.book);
    });
  }

}
