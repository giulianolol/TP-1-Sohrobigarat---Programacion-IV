import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

  user$: any;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
    console.log('Router test component loaded22222');

  }

  logout() {
    this.auth.logout();
  }
}