import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { supabase } from '../../services/auth';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.html',
  styleUrls: ['./encuesta.css']
})
export class Encuesta {

  encuestaForm: FormGroup;

  error = '';
  loading = false;
  success = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {

    this.encuestaForm = this.fb.group({

      nombre: ['', Validators.required],

      apellido: ['', Validators.required],

      edad: [
        '',
        [
          Validators.required,
          Validators.min(18),
          Validators.max(99)
        ]
      ],

      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(10)
        ]
      ],

      juegoFavorito: ['', Validators.required],

      aspectos: ['', Validators.required],

      recomendaria: ['', Validators.required],

      sugerencia: ['', Validators.required]
    });
  }

  async enviarEncuesta() {

    this.error = '';
    this.success = '';

    if (this.encuestaForm.invalid) {

      this.error =
        'Completá correctamente todos los campos';

      this.encuestaForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    const user = await this.auth.getUser();

    if (!user) {

      this.error = 'Usuario no autenticado';

      this.loading = false;

      return;
    }
    console.log(user);
    
    console.log(this.encuestaForm.value);

    const { error } = await supabase
  .from('encuestas')
  .insert({

    user_id: user.id,

    nombre: this.encuestaForm.value.nombre,

    apellido: this.encuestaForm.value.apellido,

    edad: this.encuestaForm.value.edad,

    telefono: this.encuestaForm.value.telefono,

    juego_favorito:
      this.encuestaForm.value.juegoFavorito,

    aspectos: [
      this.encuestaForm.value.aspectos
    ],

    recomendaria:
      this.encuestaForm.value.recomendaria,

    sugerencia:
      this.encuestaForm.value.sugerencia
  });

    if (error) {

      console.log(error)

      this.error = error.message;

      this.loading = false;

      return;
    }

    this.success =
      'Encuesta enviada correctamente';

    this.encuestaForm.reset();

    this.loading = false;
  }
}