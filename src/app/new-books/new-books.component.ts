import { Component } from '@angular/core';
import { Book } from '../model/books.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrl: './new-books.component.css'
})

export class NewBooksComponent {
  book: Book = { id: "0", title: '', author: '', price: 0, publicationDate: new Date() };

  constructor(private bookService: BookService, private router: Router) {}

  onSubmit() {
    
    this.book.id = Math.floor(Math.random()).toString()
    this.bookService.addBook(this.book).subscribe(() => {
      alert('Livre ajouté !');
      this.router.navigate(['/books']);
    });
  }
}
