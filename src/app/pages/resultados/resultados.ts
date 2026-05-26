import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { supabase } from '../../services/auth';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.html',
  styleUrls: ['./resultados.css']
})

export class ResultadosComponent implements OnInit {

  ahorcado: any[] = [];

  mayorMenor: any[] = [];

  preguntados: any[] = [];

  pong: any[] = [];

  cargando = true;

  mostrarMasAhorcado = false;

  mostrarMasMayorMenor = false;

  mostrarMasPreguntados = false;

  mostrarMasPong = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    await Promise.all([

      this.cargarAhorcado(),

      this.cargarMayorMenor(),

      this.cargarPreguntados(),

      this.cargarPong()

    ]);

    this.cargando = false;

    this.cdr.detectChanges();

  }

  async cargarAhorcado() {

    const { data } = await supabase

      .from('resultados_ahorcado')

      .select('*')

      .order('puntaje', { ascending: false });

    this.ahorcado = data || [];

  }

  async cargarMayorMenor() {

    const { data } = await supabase

      .from('resultados_mayor_menor')

      .select('*')

      .order('puntaje', { ascending: false })

      .order('tiempo_segundos', { ascending: true });

    this.mayorMenor = data || [];

  }

  async cargarPreguntados() {

    const { data } = await supabase

      .from('resultados_preguntados')

      .select('*')

      .order('puntaje', { ascending: false });

    this.preguntados = data || [];

  }

  async cargarPong() {

    const { data } = await supabase

      .from('resultados_pong')

      .select('*')

      .order('puntaje', { ascending: false });

    this.pong = data || [];

  }

  toggleAhorcado() {

    this.mostrarMasAhorcado =
      !this.mostrarMasAhorcado;

  }

  toggleMayorMenor() {

    this.mostrarMasMayorMenor =
      !this.mostrarMasMayorMenor;

  }

  togglePreguntados() {

    this.mostrarMasPreguntados =
      !this.mostrarMasPreguntados;

  }

  togglePong() {

    this.mostrarMasPong =
      !this.mostrarMasPong;

  }

}