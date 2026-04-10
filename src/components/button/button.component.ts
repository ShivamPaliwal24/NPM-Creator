import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="buttonClass"
      [disabled]="disabled"
      (click)="handleClick($event)"
      [attr.type]="type">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .primary {
      background-color: #007bff;
      color: white;
    }
    
    .primary:hover:not(:disabled) {
      background-color: #0056b3;
    }
    
    .secondary {
      background-color: #6c757d;
      color: white;
    }
    
    .secondary:hover:not(:disabled) {
      background-color: #545b62;
    }
    
    .success {
      background-color: #28a745;
      color: white;
    }
    
    .success:hover:not(:disabled) {
      background-color: #1e7e34;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' = 'primary';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() clicked = new EventEmitter<Event>();

  get buttonClass(): string {
    return this.variant;
  }

  handleClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
