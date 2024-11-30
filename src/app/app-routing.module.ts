import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { NewBooksComponent } from './new-books/new-books.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';

const routes: Routes = [
  {path : "", component : LoginComponent},
  {path : "login", component : LoginComponent},
  {path : "admin", component : AdminTemplateComponent, canActivate : [AuthGuard],
    children : [
      {path : "home", component : HomeComponent},
      {path : "books", component : BooksComponent},
      {path : "new-books", component : NewBooksComponent},
      { path: 'books/edit/:id', component: NewBooksComponent},
      { path: 'borrow-book', component: BorrowedBooksComponent }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
