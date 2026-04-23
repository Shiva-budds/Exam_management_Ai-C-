import { Component } from '@angular/core';
import { Services } from '../../validation_pages/services';
import { Router, RouterLink,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,RouterLink],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
 
}