import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private router: Router,
    private bookService: BookService,
    private http: HttpClient) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const bookIdFromRoute = Number(routeParams.get('id'));

    // Find the product that correspond with the id provided in route.
    this.book = this.bookService.getBooks().find((book: Book) => book.id === bookIdFromRoute);
  }

  onDelete(id: number): void {
    this.http.delete<Book>('http://localhost:3000/books/' + id).subscribe((res: any) => {console.log(res)});
    this.router.navigateByUrl("/");
  }

}
