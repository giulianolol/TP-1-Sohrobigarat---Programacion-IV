import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { supabase } from '../../services/auth';

interface Carta {
  valor: number;
  palo: string;
}

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.html',
  styleUrls: ['./mayor-menor.css']
})
export class MayorMenorComponent implements OnInit {

  palos = ['♠', '♥', '♦', '♣'];

  mazo: Carta[] = [];

  ganoPartida = false;

  cartaActual!: Carta;
  cartaSiguiente: Carta | null = null;
  cartaRevelada: Carta | null = null;

  historial: Carta[] = [];

  puntaje = 0;
  vidas = 3;

  perdio = false;
  mostrarResultado = false;
  puedeResponder = true;
  mostrandoSiguiente = false;

  inicio!: number;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.inicio = Date.now();
    this.reiniciar();
  }

  construirMazo(): void {
    this.mazo = [];

    for (let valor = 1; valor <= 13; valor++) {
      for (const palo of this.palos) {
        this.mazo.push({ valor, palo });
      }
    }
  }

  robarCarta(excluirValor?: number): Carta | null {
    const disponibles = excluirValor === undefined
      ? [...this.mazo]
      : this.mazo.filter(carta => carta.valor !== excluirValor);

    if (disponibles.length === 0) return null;

    const index = Math.floor(Math.random() * disponibles.length);
    const elegida = disponibles[index];

    const mazoIndex = this.mazo.findIndex(
      c => c.valor === elegida.valor && c.palo === elegida.palo
    );

    if (mazoIndex !== -1) {
      this.mazo.splice(mazoIndex, 1);
    }

    return elegida;
  }

  iniciarPartida(): void {
    this.construirMazo();

    this.historial = [];
    this.puntaje = 0;
    this.vidas = 3;
    this.perdio = false;
    this.mostrarResultado = false;
    this.puedeResponder = true;
    this.mostrandoSiguiente = false;

    this.cartaActual = this.robarCarta()!;

    this.cartaSiguiente = this.robarCarta(this.cartaActual.valor);

    if (!this.cartaSiguiente) {
      this.perdio = true;
    }
  }

  async elegir(opcion: 'mayor' | 'menor') {
    if (this.perdio || !this.puedeResponder || !this.cartaSiguiente) return;

    this.puedeResponder = false;
    this.mostrarResultado = true;
    this.mostrandoSiguiente = true;

    const correcta =
      (opcion === 'mayor' && this.cartaSiguiente.valor > this.cartaActual.valor) ||
      (opcion === 'menor' && this.cartaSiguiente.valor < this.cartaActual.valor);

    this.cartaRevelada = this.cartaSiguiente;

    if (correcta) {
      this.puntaje++;
    } else {
      this.vidas--;
    }

    if (this.vidas <= 0) {
      this.perdio = true;
      await this.guardarResultado();
    }
  }

  siguienteRonda() {
    if (this.perdio || !this.cartaRevelada) return;

    this.historial.push(this.cartaActual);

    this.cartaActual = this.cartaRevelada;
    this.cartaRevelada = null;

    this.cartaSiguiente = this.robarCarta(this.cartaActual.valor);

    if (!this.cartaSiguiente) {
      this.ganoPartida = true;
      this.guardarResultado();
      return;
    }

    this.mostrarResultado = false;
    this.mostrandoSiguiente = false;
    this.puedeResponder = true;
  }

  obtenerValorCarta(valor: number): string {
    switch (valor) {
      case 1: return 'A';
      case 11: return 'J';
      case 12: return 'Q';
      case 13: return 'K';
      default: return valor.toString();
    }
  }

  obtenerCartaVisual(carta: Carta | null): string {
    if (!carta) return '/assets/cartas/reverso.png';
    return `/assets/tarot/${carta.valor}.jpg`;
  }

  reiniciar() {
    this.inicio = Date.now();
    this.iniciarPartida();
    this.ganoPartida = false;
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