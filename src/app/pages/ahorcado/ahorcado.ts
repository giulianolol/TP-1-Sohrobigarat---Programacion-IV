import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';

import { supabase } from '../../services/auth';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ahorcado.html',
  styleUrls: ['./ahorcado.css']
})

export class AhorcadoComponent implements OnInit {

  palabras = [

    'ANGULAR',
    'SUPABASE',
    'TYPESCRIPT',
    'COMPONENTE',
    'SERVICIO',
    'PROGRAMACION',
    'DESARROLLO',
    'JAVASCRIPT'

  ];

  abecedario =
    'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

  palabraSecreta = '';

  palabraOculta: string[] = [];

  letrasUsadas: string[] = [];

  intentos = 6;

  puntaje = 0;

  imagenAhorcado =
    '/assets/ahorcado/0.png';

  gano = false;

  perdio = false;

  bloqueado = false;

  inicio!: number;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {

    this.inicio = Date.now();

    this.generarPalabra();
  }

  generarPalabra() {

    const random =
      Math.floor(Math.random() * this.palabras.length);

    this.palabraSecreta =
      this.palabras[random];

    this.palabraOculta =
      Array(this.palabraSecreta.length).fill('_');

    this.letrasUsadas = [];

    this.intentos = 6;

    this.actualizarImagen();

    this.gano = false;

    this.bloqueado = false;

    this.perdio = false;
  }

  actualizarImagen() {

    const errores = 6 - this.intentos;

    this.imagenAhorcado =
      `/assets/ahorcado/${errores}.png`;
  }

  seleccionarLetra(letra: string) {

    if (this.perdio || this.bloqueado)
      return;

    if (this.letrasUsadas.includes(letra))
      return;

    this.letrasUsadas.push(letra);

    let acerto = false;

    for (
      let i = 0;
      i < this.palabraSecreta.length;
      i++
    ) {

      if (
        this.palabraSecreta[i] === letra
      ) {

        this.palabraOculta[i] = letra;

        acerto = true;
      }
    }

    if (!acerto) {

      this.intentos--;

      this.actualizarImagen();
    }

    // GANÓ

    if (!this.palabraOculta.includes('_')) {

      this.puntaje++;

      this.gano = true;

      this.bloqueado = true;

      setTimeout(() => {

        this.generarPalabra();

      }, 1000);

      return;
    }

    // PERDIÓ

    if (this.intentos <= 0) {

      this.perdio = true;

      this.bloqueado = true;

      const puntajeFinal = this.puntaje;

      this.guardarPartida(puntajeFinal);

      this.puntaje = 0;
    }
  }

  reiniciar() {

    this.perdio = false;

    this.gano = false;

    this.bloqueado = false;

    this.inicio = Date.now();

    this.generarPalabra();
  }

  async guardarPartida(puntajeFinal: number) {

  const tiempo =
    Math.floor(
      (Date.now() - this.inicio) / 1000
    );

  const user =
    await this.auth.getUser();

  await supabase

    .from('resultados_ahorcado')

    .insert({

      usuario: user?.email,

      puntaje: puntajeFinal,

      tiempo_segundos: tiempo,

      fecha: new Date()
    });
}
}