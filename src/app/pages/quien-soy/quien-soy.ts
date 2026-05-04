import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quien-soy.html',
  styleUrls: ['./quien-soy.css'],
})
export class QuienSoy implements OnInit {

  user: any;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.getUser('giulianolol').subscribe(data => {
      this.user = data;
    });
  }
}