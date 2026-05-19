import { Component } from '@angular/core';
import { GithubService } from '../../services/github';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quien-soy.html',
  styleUrls: ['./quien-soy.css'],
})
export class QuienSoy {

  user$;

  constructor(private githubService: GithubService) {
    this.user$ = this.githubService.getUser('giulianolol');
        console.log('Router test component loaded33333');
  }

}