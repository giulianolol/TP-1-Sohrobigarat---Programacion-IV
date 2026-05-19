import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xvtzkirfamysiyyqbxpz.supabase.co';
const supabaseKey = 'sb_publishable_3TZqZ8afrA62XntyBpm9HQ_B6kd_eRc';

export const supabase = createClient(supabaseUrl, supabaseKey);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.initSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      this.userSubject.next(session?.user ?? null);
    });
  }

  private async initSession() {
    const { data } = await supabase.auth.getSession();
    this.userSubject.next(data.session?.user ?? null);
  }

  async login(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async register(
    email: string,
    password: string,
    nombre: string,
    apellido: string
  ) {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          apellido
        }
      }
    });
  }

  async logout() {
    return await supabase.auth.signOut();
  }
}