import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.component.html',
  styleUrls: ['./book-new.component.css']
})
export class BookNewComponent implements OnInit {

  bookForm = this.fb.group({
    title: [null, Validators.required],
    author: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private location: Location
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.bookService.addBook(this.bookForm.value)
      .subscribe(res => {
        console.log(res);
        this.goBack();
      });
  }

  goBack(): void {
    this.location.back();
  }

}
