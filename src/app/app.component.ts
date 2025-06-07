import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackPageComponent } from './features/feedback-page.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FeedbackPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-feedback-form';
}
