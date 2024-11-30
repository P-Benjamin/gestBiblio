import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentification.service';
import { Book } from '../model/books.model';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {
  borrowedBooks: Book[] = [];

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.getBorrowedBooks().subscribe(books => {
      this.borrowedBooks = books;
    });
  }
}
