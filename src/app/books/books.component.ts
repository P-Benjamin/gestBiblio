import { Component } from '@angular/core';
import { Book } from '../model/books.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data,
      error => console.error('Erreur lors de la récupération des livres', error)
    );
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe(() => {
      alert('Livre supprimé !');
      this.loadBooks();
    });
  }
}


