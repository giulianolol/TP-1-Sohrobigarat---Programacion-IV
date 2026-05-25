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

  pulsoFantasma: any[] = [];

  cargando = true;

  mostrarMasAhorcado = false;

  mostrarMasMayorMenor = false;

  mostrarMasPreguntados = false;

  mostrarMasPulso = false;

  constructor(
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    await Promise.all([

      this.cargarAhorcado(),

      this.cargarMayorMenor(),

      this.cargarPreguntados(),

      this.cargarPulsoFantasma()

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

    .order('puntaje', { ascending: false });

    this.mayorMenor = data || [];

  }

  async cargarPreguntados() {

    const { data } = await supabase

    .from('resultados_preguntados')

    .select('*')

    .order('puntaje', { ascending: false });

    this.preguntados = data || [];

  }

  async cargarPulsoFantasma() {

    const { data } = await supabase

    .from('resultados_pulso_fantasma')

    .select('*')

    .order('puntaje', { ascending: false });

    this.pulsoFantasma = data || [];

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

  togglePulso() {

    this.mostrarMasPulso =
      !this.mostrarMasPulso;
  }
}