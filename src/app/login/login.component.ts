import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentification.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  errorMessage: string = '';
  public loginFormGroup! : FormGroup;
  constructor(private fb : FormBuilder,
              private authService : AuthenticationService,
              private router : Router) {
  }
  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    });
  }

  login(): void {
    this.authService.login(this.loginFormGroup.value.username, this.loginFormGroup.value.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/admin']); // Redirige vers la page d'accueil après connexion
        } else {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        }
      },
      error => {
        console.error('Erreur lors de la connexion', error);
        this.errorMessage = 'Erreur de connexion au serveur.';
      }
    );
  }
}
