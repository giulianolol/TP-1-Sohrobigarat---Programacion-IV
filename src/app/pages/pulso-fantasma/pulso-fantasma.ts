import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';
import { supabase } from '../../services/auth';

@Component({
  selector: 'app-pulso-fantasma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pulso-fantasma.html',
  styleUrls: ['./pulso-fantasma.css']
})

export class PulsoFantasmaComponent implements OnInit, OnDestroy {

  estado = 'esperando';

  mensaje = 'Esperando señal...';

  tiempoInicio = 0;

  tiempoReaccion = 0;

  timeout: any;

  ronda = 1;

  puntaje = 0;

  promedio = 0;

  tiempos: number[] = [];
  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.iniciarRonda();

  }

  iniciarRonda() {

    this.estado = 'esperando';

    this.mensaje = 'Preparado...';

    const tiempoRandom =
      Math.floor(Math.random() * 4000) + 2000;

    this.timeout = setTimeout(() => {

      this.estado = 'listo';

      this.mensaje = ' TOCA YA ';

      this.tiempoInicio = Date.now();

      this.cdr.detectChanges();

    }, tiempoRandom);
  }
  async reaccionar() {

    if (this.estado === 'esperando') {

      clearTimeout(this.timeout);

      this.estado = 'perdio';

      this.mensaje = ' Tocaste demasiado temprano';

      await this.guardarResultado();

      return;
    }

    if (this.estado === 'listo') {

      const fin = Date.now();

      this.tiempoReaccion = fin - this.tiempoInicio;

      this.tiempos.push(this.tiempoReaccion);

      this.puntaje++;

      this.promedio = Math.floor(
        this.tiempos.reduce((a, b) => a + b, 0)
        / this.tiempos.length
      );

      this.estado = 'resultado';

      this.mensaje = ` ${this.tiempoReaccion} ms`;
    }
  }
    siguienteRonda() {

    this.ronda++;

    this.iniciarRonda();

  }

  reiniciar() {

    this.ronda = 1;

    this.puntaje = 0;

    this.promedio = 0;

    this.tiempos = [];

    this.iniciarRonda();

  }

  async guardarResultado() {

    const user = await this.auth.getUser();

    await supabase
    .from('resultados_pulso_fantasma')
    .insert({

      usuario: user?.email,

      puntaje: this.puntaje,

      promedio_ms: this.promedio,

      fecha: new Date()

    });
  }
    ngOnDestroy(): void {

    clearTimeout(this.timeout);

  }
}