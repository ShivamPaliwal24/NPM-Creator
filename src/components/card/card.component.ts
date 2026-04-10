import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class.elevated]="elevated">
      <div class="card-header" *ngIf="title">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer" *ngIf="hasFooter">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      transition: box-shadow 0.3s ease;
    }
    
    .card.elevated {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .card.elevated:hover {
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    }
    
    .card-header {
      padding: 16px;
      border-bottom: 1px solid #eee;
      background-color: #f8f9fa;
    }
    
    .card-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }
    
    .card-body {
      padding: 16px;
    }
    
    .card-footer {
      padding: 16px;
      border-top: 1px solid #eee;
      background-color: #f8f9fa;
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
  @Input() elevated: boolean = false;
  @Input() hasFooter: boolean = false;
}
