import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentification.service";
import {Route, Router} from "@angular/router";
import { User } from '../model/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  errorMessage: string = '';
  public loginFormGroup! : FormGroup;
  registerFormGroup!: FormGroup;
  user: User = { username: '', password: '', roles: ["USER"] };


  constructor(private fb : FormBuilder,
              private authService : AuthenticationService,
              private router : Router) {
  }
  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username : this.fb.control(''),
      password : this.fb.control('')
    });

    this.registerFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.registerFormGroup.disable();
  }

  login(): void {
    this.authService.login(this.loginFormGroup.value.username, this.loginFormGroup.value.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/admin']); 
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

  register(): void {
    if (this.registerFormGroup.valid) {
      const { username, password, confirmPassword } = this.registerFormGroup.value;
      if (password === confirmPassword) {
        this.user.username = username;
        this.user.password = password

        this.authService.addUser(this.user).subscribe(() => {
          alert('Utilisateur créé avec succès !');
          this.toggleLogin(); 
        });
      } else {
        alert('Les mots de passe ne correspondent pas.');
      }
    }
  }

  toggleRegister(): void {
    this.registerFormGroup.reset();
    this.registerFormGroup.enable();
    this.loginFormGroup.disable();
  }

  toggleLogin(): void {
    this.loginFormGroup.reset();
    this.loginFormGroup.enable();
    this.registerFormGroup.disable();
  }
}
