import { Component, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  camposTocados = {

  nombre: false,
  apellido: false,
  edad: false,
  email: false,
  password: false

};

tocarCampo(campo: string) {

  this.camposTocados[campo as keyof typeof this.camposTocados] = true;

}

emailValido(): boolean {

  return this.email.includes('@');

}

passwordValida(): boolean {

  return this.password.length >= 6;

}

formularioValido(): boolean {

  return (

    this.nombre.trim() !== '' &&
    this.apellido.trim() !== '' &&
    this.edad !== null &&
    this.edad > 0 &&
    this.emailValido() &&
    this.passwordValida()

  );

}

  async register() {

    if (this.loading) return;

    this.error = '';
    this.success = '';

    if (!this.nombre.trim()) {

      this.error = 'Ingresa un nombre';
      this.cdr.detectChanges();
      return;

    }

    if (!this.apellido.trim()) {

      this.error = 'Ingresa un apellido';
      this.cdr.detectChanges();
      return;

    }

    if (!this.edad || this.edad < 1) {

      this.error = 'Ingresa una edad válida';
      this.cdr.detectChanges();
      return;

    }

    if (!this.email.trim()) {

      this.error = 'Ingresa un correo electrónico';
      this.cdr.detectChanges();
      return;

    }

    if (!this.email.includes('@')) {

      this.error = 'Ingresa un correo electrónico válido';
      this.cdr.detectChanges();
      return;

    }

    if (!this.password.trim()) {

      this.error = 'Ingresa una contraseña';
      this.cdr.detectChanges();
      return;

    }

    if (this.password.length < 6) {

      this.error = 'La contraseña debe tener al menos 6 caracteres';
      this.cdr.detectChanges();
      return;

    }

    this.loading = true;
    this.cdr.detectChanges();


    const { error } = await this.auth.register(

      this.email,
      this.password,
      this.nombre,
      this.apellido

    );


    if (error) {

      if (error.message.includes('User already registered')) {

        this.error = 'Ese correo ya está registrado';

      }

      else if (error.message.includes('Password should be at least')) {

        this.error = 'La contraseña debe tener al menos 6 caracteres';

      }

      else if (error.message.includes('Unable to validate email address')) {

        this.error = 'El correo electrónico no es válido';

      }

      else {

        this.error = 'Ocurrió un error al registrarse';

      }

      this.loading = false;

      this.cdr.detectChanges();

      return;
    }


    this.success = 'Usuario registrado correctamente';

    this.loading = false;

    this.cdr.detectChanges();

    setTimeout(() => {

      this.router.navigate(['/']);

    }, 1000);
  }
}