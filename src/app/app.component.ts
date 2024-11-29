import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingComponent} from "./common/loading/loading/loading.component";
import {LoadingService} from "./common/loading/loading.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoadingComponent,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'inProLa-front';

  constructor(public loadingService: LoadingService) {}
}
