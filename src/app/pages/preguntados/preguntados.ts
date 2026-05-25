import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../services/auth';
import { supabase } from '../../services/auth';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.html',
  styleUrls: ['./preguntados.css']
})

export class PreguntadosComponent implements OnInit {

  personajes: any[] = [];

  personajeCorrecto: any;

  puntaje = 0;

  perdio = false;

  cargando = true;

  inicio!: number;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.inicio = Date.now();

    this.cargarPregunta();

  }

  async cargarPregunta() {

    this.cargando = true;

    this.cdr.detectChanges();

    const ids: number[] = [];

    while (ids.length < 4) {

      const random = Math.floor(Math.random() * 826) + 1;

      if (!ids.includes(random)) {

        ids.push(random);

      }
    }

    this.http
    .get<any>(`https://rickandmortyapi.com/api/character/${ids.join(',')}`)

    .subscribe((data) => {

      this.personajes = data;

      const randomIndex = Math.floor(Math.random() * 4);

      this.personajeCorrecto = this.personajes[randomIndex];

      this.cargando = false;

      this.cdr.detectChanges();

    });
  }

  async responder(nombre: string) {

    if (this.perdio) return;

    if (nombre === this.personajeCorrecto.name) {

      this.puntaje++;

      this.cargarPregunta();

    }

    else {

      this.perdio = true;

      this.cdr.detectChanges();

      await this.guardarResultado();

    }
  }

  reiniciar() {

    this.puntaje = 0;

    this.perdio = false;

    this.inicio = Date.now();

    this.cargarPregunta();

  }

  async guardarResultado() {

    const tiempo = Math.floor((Date.now() - this.inicio) / 1000);

    const user = await this.auth.getUser();

    await supabase
    .from('resultados_preguntados')
    .insert({

      usuario: user?.email,

      puntaje: this.puntaje,

      tiempo_segundos: tiempo,

      fecha: new Date()

    });
  }
}