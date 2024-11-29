import { Component } from '@angular/core';
import { Book } from '../model/books.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  books: Book[] = [];

  constructor(private bookService: BookService, private router : Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data,
      error => console.error('Erreur lors de la récupération des livres', error)
    );
  }

  editBook(book: Book) {
      this.router.navigate(['/admin/books/edit', book.id]);
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe(() => {
      alert('Livre supprimé !');
      this.loadBooks();
    });
  }
}


