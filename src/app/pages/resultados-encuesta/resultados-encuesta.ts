import {
  Component,
  OnInit,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { supabase } from '../../services/auth';

@Component({
  selector: 'app-resultados-encuesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados-encuesta.html',
  styleUrls: ['./resultados-encuesta.css']
})

export class ResultadosEncuesta implements OnInit {

  encuestas = signal<any[]>([]);

  async ngOnInit() {

    const { data } = await supabase

      .from('encuestas')

      .select('*')

      .order('created_at', {
        ascending: false
      });

    this.encuestas.set(data || []);
  }
}
