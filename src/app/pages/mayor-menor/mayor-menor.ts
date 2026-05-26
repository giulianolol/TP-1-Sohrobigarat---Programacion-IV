import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { supabase } from '../../services/auth';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.html',
  styleUrls: ['./mayor-menor.css']
})

export class MayorMenorComponent implements OnInit {

  cartaActual = 0;

  siguienteCarta = 0;

  puntaje = 0;

  perdio = false;

  inicio!: number;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {

    this.nuevaCarta();

    this.inicio = Date.now();

  }

  nuevaCarta() {

    this.cartaActual = Math.floor(Math.random() * 22);

  }

  async elegir(opcion: 'mayor' | 'menor') {

    if (this.perdio) return;

    this.siguienteCarta = Math.floor(Math.random() * 22);

    let acerto = false;

    if (
      opcion === 'mayor' &&
      this.siguienteCarta > this.cartaActual
    ) {

      acerto = true;

    }

    if (
      opcion === 'menor' &&
      this.siguienteCarta < this.cartaActual
    ) {

      acerto = true;

    }

    if (acerto) {

      this.puntaje++;

      this.cartaActual = this.siguienteCarta;

    }

    else {

      this.perdio = true;

      await this.guardarResultado();

    }
  }

  obtenerCartaVisual(numero: number): string {

  return `/assets/tarot/${numero}.jpg`;

}

  reiniciar() {

    this.puntaje = 0;

    this.perdio = false;

    this.nuevaCarta();

    this.inicio = Date.now();

  }

  async guardarResultado() {

    const tiempo = Math.floor((Date.now() - this.inicio) / 1000);

    const user = await this.auth.getUser();

    await supabase
    .from('resultados_mayor_menor')
    .insert({

      usuario: user?.email,

      puntaje: this.puntaje,

      tiempo_segundos: tiempo,

      fecha: new Date()

    });
  }
}