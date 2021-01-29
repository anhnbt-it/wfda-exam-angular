import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDeleteComponent } from './views/book-delete/book-delete.component';
import { BookDetailComponent } from './views/book-detail/book-detail.component';
import { BookEditComponent } from './views/book-edit/book-edit.component';
import { BookListComponent } from './views/book-list/book-list.component';
import { BookNewComponent } from './views/book-new/book-new.component';

const routes: Routes = [
  { path: '', component: BookListComponent},
  { path: 'book-detail/:id', component: BookDetailComponent },
  { path: 'book-delete/:id', component: BookDeleteComponent },
  { path: 'book-edit/:id', component: BookEditComponent },
  { path: 'book-new', component: BookNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
