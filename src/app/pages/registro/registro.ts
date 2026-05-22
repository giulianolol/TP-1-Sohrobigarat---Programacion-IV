import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
})
export class Registro {

  email = '';
  password = '';
  nombre = '';
  apellido = '';
  edad: number | null = null;

  error = '';
  success = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async register() {

    if (this.loading) return;

    this.error = '';
    this.success = '';

    if (!this.email || !this.password || !this.nombre || !this.apellido || !this.edad) {
      this.error = 'Completa todos los campos';
      return;
    }

    this.loading = true;

    const { error } = await this.auth.register(

  this.email,
  this.password,
  this.nombre,
  this.apellido
  
);

    if (error) {
      this.error = error.message;
      this.loading = false;
      return;
    }

    const loginResult = await this.auth.login(this.email, this.password);

    if (loginResult.error) {
      this.error = loginResult.error.message;
      this.loading = false;
      return;
    }

    this.success = 'Usuario registrado correctamente';

    this.loading = false;

    this.router.navigate(['/']);
  }
}