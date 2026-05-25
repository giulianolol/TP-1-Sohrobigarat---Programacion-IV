import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})

export class Home implements OnInit {

  user$: any;

  audio = new Audio('/assets/music/musica.mp3');

  constructor(private auth: AuthService) {

    this.user$ = this.auth.user$;
  }

  ngOnInit(): void {

    this.audio.volume = 0.15;

    this.audio.loop = false;

    this.audio.play()
    .catch(() => {

      console.log('Autoplay bloqueado por el navegador');

    });
  }

  logout() {

    this.auth.logout();
  }
}