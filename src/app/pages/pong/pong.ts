import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { supabase } from '../../services/auth';

@Component({
  selector: 'app-pong',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pong.html',
  styleUrls: ['./pong.css']
})
export class PongComponent implements AfterViewInit {

  @ViewChild('canvas')
  canvasRef!: ElementRef<HTMLCanvasElement>;

  ctx!: CanvasRenderingContext2D;

  ancho = 900;
  alto = 550;

  pelota = {
    x: 450,
    y: 250,
    dx: 4,
    dy: -4,
    radio: 14
  };

  barra = {
    x: 375,
    y: 510,
    ancho: 150,
    alto: 16,
    velocidad: 45
  };

  puntaje = 0;
  gameOver = false;

  mostrarRuleta = false;

  colorElegido = '';

  resultadoRuleta = '';

  mensajeRuleta = '';

  numeroRuleta = 0;

  contadorReinicio = 3;

  constructor(
  private cdr: ChangeDetectorRef
) {}

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;

    this.ctx = canvas.getContext('2d')!;

    this.iniciarControles();

    this.loop();
  }

  iniciarControles() {
    window.addEventListener(
      'keydown',
      (e) => {

        if (e.key === 'ArrowLeft') {
          this.barra.x -= this.barra.velocidad;
        }

        if (e.key === 'ArrowRight') {
          this.barra.x += this.barra.velocidad;
        }

        // límites
        if (this.barra.x < 0) {
          this.barra.x = 0;
        }

        if (
          this.barra.x + this.barra.ancho >
          this.ancho
        ) {
          this.barra.x =
            this.ancho - this.barra.ancho;
        }
      }
    );
  }

  loop() {
    if (
  this.gameOver ||
  this.mostrarRuleta
) return;

    this.actualizar();

    this.dibujar();

    requestAnimationFrame(
      () => this.loop()
    );
  }

  actualizar() {

    this.pelota.x += this.pelota.dx;
    this.pelota.y += this.pelota.dy;

    // paredes laterales
    if (
      this.pelota.x + this.pelota.radio >= this.ancho ||
      this.pelota.x - this.pelota.radio <= 0
    ) {
      this.pelota.dx *= -1;
    }

    // techo
    if (
      this.pelota.y - this.pelota.radio <= 0
    ) {
      this.pelota.dy *= -1;
    }

    // colisión con barra
    const tocaBarra =
      this.pelota.y + this.pelota.radio >= this.barra.y &&
      this.pelota.y + this.pelota.radio <= this.barra.y + this.barra.alto &&
      this.pelota.x >= this.barra.x &&
      this.pelota.x <= this.barra.x + this.barra.ancho &&
      this.pelota.dy > 0;

    if (tocaBarra) {

      this.pelota.dy *= -1;

      this.puntaje++;

      if (
      this.puntaje > 0 &&
      this.puntaje % 4 === 0
    ) {
      this.mostrarRuleta = true;
    }

      this.cdr.detectChanges();

      // velocidad progresiva
if (this.puntaje % 5 === 0) {
  this.pelota.dx *= 1.11;
  this.pelota.dy *= 1.11;
}

      // evita doble colisión
      this.pelota.y =
        this.barra.y -
        this.pelota.radio;
    }

    // perder
    if (
    this.pelota.y - this.pelota.radio >
    this.alto
  ) {
    this.gameOver = true;

    this.cdr.detectChanges();

    this.guardarResultado();
  }
  }

  dibujar() {

    this.ctx.clearRect(
      0,
      0,
      this.ancho,
      this.alto
    );

    // pelota
    this.ctx.fillStyle = '#60a5fa';

    this.ctx.beginPath();

    this.ctx.arc(
      this.pelota.x,
      this.pelota.y,
      this.pelota.radio,
      0,
      Math.PI * 2
    );

    this.ctx.fill();

    // barra
    this.ctx.fillStyle = '#f8fafc';

    this.ctx.fillRect(
      this.barra.x,
      this.barra.y,
      this.barra.ancho,
      this.barra.alto
    );
  }

  reiniciar() {
    location.reload();
  }

  elegirColor(
  color: 'rojo' | 'negro'
) {

  this.colorElegido = color;

  const colores = [
    'rojo',
    'negro'
  ];

  const resultadoColor =
    colores[
      Math.floor(
        Math.random() * 2
      )
    ];

  const resultadoNumero =
    Math.floor(
      Math.random() * 36
    ) + 1;

  this.resultadoRuleta =
    resultadoColor;

  this.numeroRuleta =
    resultadoNumero;

  if (
    resultadoColor === color
  ) {
    this.puntaje *= 2;

    this.mensajeRuleta =
      '¡Ganaste! Puntaje duplicado.';
  }

  else {

    this.puntaje =
      Math.max(
        1,
        Math.floor(
          this.puntaje / 2
        )
      );

    this.mensajeRuleta =
      'Perdiste. Puntaje dividido.';
  }

  this.cdr.detectChanges();

  this.iniciarCuentaRegresiva();
}
iniciarCuentaRegresiva() {

  this.contadorReinicio = 3;

  const intervalo =
    setInterval(() => {

      this.contadorReinicio--;

      this.cdr.detectChanges();

      if (
      this.contadorReinicio === 0
    ) {
      clearInterval(intervalo);

      this.mostrarRuleta = false;

      this.mensajeRuleta = '';

      this.resultadoRuleta = '';

      this.numeroRuleta = 0;

      this.colorElegido = '';

      this.cdr.detectChanges();

      this.loop();
    }

    }, 1000);
}
async guardarResultado() {

  const { data } =
    await supabase.auth.getUser();

  const email =
    data.user?.email || 'Jugador';

  await supabase
    .from('resultados_pong')
    .insert({
      usuario: email,
      puntaje: this.puntaje
    });

}
}