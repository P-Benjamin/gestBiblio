import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Book } from '../model/books.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';
import { DataTable} from "simple-datatables"

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit, AfterViewInit{
  books: Book[] = [];
  public roles : string[] = [];

  constructor(private bookService: BookService,private authService : AuthenticationService, private router : Router) {}

  ngOnInit() {
    this.roles = this.authService.roles
    this.loadBooks();
  }

  ngAfterViewInit() : void 
  {
    setTimeout(() => {
      const table = new DataTable("#productTable", {
        searchable : true,
        perPage : 10,
        perPageSelect : [5,10,20,40],
        labels : {
          placeholder : "Rechercher ...",
          perPage : "produits par page",
          noRows : "Aucun produit trouvé",
          info : "Affichage de {start à {end} sur {rows} produits"
        }
      });
    },100)
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

  borrowBook(book: Book) {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser.id_book) {
      currentUser.id_book = [];
    }
    
    currentUser.id_book.push(book.id);
    
    this.authService.updateUser(currentUser).subscribe({
      next: () => {
        book.available = false;
        this.bookService.updateBook(book).subscribe({
          next: () => alert(`Le livre "${book.title}" a été emprunté avec succès !`),
          error: () => alert(`Erreur lors de la mise à jour de la disponibilité du livre "${book.title}".`)
        });
      },
      error: () => alert("Erreur lors de la mise à jour de l'utilisateur.")
    });
  }
}


