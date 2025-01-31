import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  template: `
    <div class="loading-spinner"></div>
  `,
  styles: [`
    :host {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      z-index: 1100;
      background: rgba(0, 0, 0, 0.5);
    }

    .loading-spinner {
      border: 16px solid #f3f3f3;
      border-top: 16px solid #3498db;
      border-radius: 50%;
      width: 120px;
      height: 120px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

  `]
})
export class LoadingComponent {}
