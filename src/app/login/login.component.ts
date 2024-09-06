import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage = '';
  loginModel: Login = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginModel).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveUserId(response.userId);
        this.router.navigate(['/contacts']);
      },
      error: (error) => {
        this.errorMessage = 'Incorrect username or password';
      }
    });
  }
}
