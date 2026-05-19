import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

constructor(
  private auth: AuthService,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

  async login() {
  this.error = '';

  const { error } = await this.auth.login(this.email, this.password);

  if (error) {
    this.error = 'Correo o contraseña incorrectos';
    this.cdr.detectChanges();
    return;
  }

  this.router.navigate(['/']);
}
}