import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth';
import { supabase } from '../../services/auth';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})

export class ChatComponent implements OnInit, OnDestroy {

  mensajes: any[] = [];

  nuevoMensaje = '';

  usuarioActual = '';

  canal: any;

  constructor(private auth: AuthService) {}

  async ngOnInit() {

    const user = await this.auth.getUser();

    this.usuarioActual = user?.email || '';

    this.cargarMensajes();

    this.suscribirseMensajes();

  }

  async cargarMensajes() {

    const { data } = await supabase
    .from('mensajes')
    .select('*')
    .order('fecha', { ascending: true });

    this.mensajes = data || [];

  }

  suscribirseMensajes() {

    this.canal = supabase
    .channel('chat-global')

    .on(

      'postgres_changes',

      {
        event: 'INSERT',
        schema: 'public',
        table: 'mensajes'
      },

      (payload) => {

        this.mensajes.push(payload.new);

      }

    )

    .subscribe();

  }

  async enviarMensaje() {

    if (!this.nuevoMensaje.trim()) return;

    await supabase
    .from('mensajes')
    .insert({

      usuario: this.usuarioActual,

      mensaje: this.nuevoMensaje

    });

    this.nuevoMensaje = '';

  }

  esMio(usuario: string): boolean {

    return usuario === this.usuarioActual;

  }

  ngOnDestroy(): void {

    supabase.removeChannel(this.canal);

  }
}