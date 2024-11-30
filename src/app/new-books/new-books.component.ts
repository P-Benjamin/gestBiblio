import { Component } from '@angular/core';
import { Book } from '../model/books.model';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-books',
  templateUrl: './new-books.component.html',
  styleUrl: './new-books.component.css'
})

export class NewBooksComponent {
  bookForm!: FormGroup;
  isEditMode = false;
  bookId: string  = "";


  constructor(private fb: FormBuilder, private bookService: BookService, private router: Router,  private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: [0, Validators.required],
      publicationDate: ['', Validators.required],
      available: [true, Validators.required] // Initialisé à 'true' par défaut
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.bookId = params['id'];
        this.loadBook(this.bookId.toString());
      }
    });
  }

  loadBook(id: string): void {
    console.log(id)
    this.bookService.getBookById(id).subscribe(book => {
      this.bookForm.patchValue(book);
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const book: Book = this.bookForm.value;

      if (this.isEditMode && this.bookId !== null) {
        book.id = this.bookId.toString();
        this.bookService.updateBook(book).subscribe(() => {
          alert('Livre modifié avec succès !');
          this.router.navigate(['/admin/books']);
        });
      } else {
        this.bookService.addBook(book).subscribe(() => {
          alert('Livre ajouté avec succès !');
          this.router.navigate(['/admin/books']);
        });
      }
    }
  }
}
