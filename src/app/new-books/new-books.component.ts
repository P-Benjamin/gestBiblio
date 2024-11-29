import { Component } from '@angular/core';
import { Book } from '../model/books.model';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrl: './new-books.component.css'
})

export class NewBooksComponent {
  book: Book = { id:'' ,  title: '', author: '', price: 0, publicationDate: new Date() };
  isEditMode = false;

  constructor(private bookService: BookService, private router: Router,  private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.bookService.getBookById(id).subscribe(
        data => this.book = data,
        error => console.error('Erreur lors du chargement du livre', error)
      );
    }
    else 
    {
      this.isEditMode = false;
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.bookService.updateBook(this.book).subscribe(() => {
        alert('Livre modifié avec succès !');
        this.router.navigate(['/admin/books']);
      });
    }
    else {
      this.bookService.getLastId().subscribe(lastId => {
        this.book.id = String(lastId + 1);
        this.bookService.addBook(this.book).subscribe(() => {
          alert('Livre ajouté avec succès !');
          this.router.navigate(['/admin/books']);
        }, error => {
          console.error('Erreur lors de l’ajout du livre :', error);
          alert('Erreur lors de l’ajout du livre.');
        });
      });
    }
}
}
