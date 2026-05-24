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

  abecedario = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

  palabraSecreta = '';
  palabraOculta: string[] = [];

  letrasUsadas: string[] = [];

  intentos = 6;

  gano = false;
  perdio = false;

  inicio!: number;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {

    this.iniciarJuego();

  }

  iniciarJuego() {

    const random = Math.floor(Math.random() * this.palabras.length);

    this.palabraSecreta = this.palabras[random];

    this.palabraOculta = Array(this.palabraSecreta.length).fill('_');

    this.letrasUsadas = [];

    this.intentos = 6;

    this.gano = false;
    this.perdio = false;

    this.inicio = Date.now();
  }

  seleccionarLetra(letra: string) {

    if (this.letrasUsadas.includes(letra)) return;

    if (this.gano || this.perdio) return;

    this.letrasUsadas.push(letra);

    let acerto = false;

    for (let i = 0; i < this.palabraSecreta.length; i++) {

      if (this.palabraSecreta[i] === letra) {

        this.palabraOculta[i] = letra;

        acerto = true;
      }
    }

    if (!acerto) {

      this.intentos--;
    }

    if (!this.palabraOculta.includes('_')) {

      this.gano = true;

      this.guardarPartida('Ganó');
    }

    if (this.intentos <= 0) {

      this.perdio = true;

      this.guardarPartida('Perdió');
    }
  }

  async guardarPartida(resultado: string) {

    const tiempo = Math.floor((Date.now() - this.inicio) / 1000);

    const user = await this.auth.getUser();

    await supabase
    .from('resultados_ahorcado')
    .insert({

      usuario: user?.email,
      resultado: resultado,
      palabra: this.palabraSecreta,
      tiempo_segundos: tiempo,
      letras_usadas: this.letrasUsadas.length,
      fecha: new Date()

    });
  }
}
