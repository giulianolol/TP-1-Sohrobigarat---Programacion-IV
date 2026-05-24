import { Component } from '@angular/core';
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
export class Home {

  user$: any;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;

  }

  logout() {
    this.auth.logout();
  }
}