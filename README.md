# Angular UI Library

A reusable Angular component and service library that you can install in any Angular project.

## 📦 Installation

### Option 1: Install from npm (after publishing)

```bash
npm install @your-scope/angular-ui-library
```

### Option 2: Install locally for testing

```bash
# In this library directory
npm pack

# In your Angular project
npm install /path/to/your-scope-angular-ui-library-1.0.0.tgz
```

## 🚀 Quick Start

### Import Components

```typescript
import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from '@your-scope/angular-ui-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <lib-card title="Welcome" [elevated]="true">
      <p>This is a reusable card component!</p>
      <div footer>
        <lib-button variant="primary" (clicked)="handleClick()">
          Click Me
        </lib-button>
      </div>
    </lib-card>
  `
})
export class AppComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
```

### Use Services

```typescript
import { Component, inject } from '@angular/core';
import { LoggerService, LogLevel } from '@your-scope/angular-ui-library';

@Component({
  selector: 'app-example',
  template: `<h1>Check Console</h1>`
})
export class ExampleComponent {
  private logger = inject(LoggerService);

  ngOnInit() {
    this.logger.setLogLevel(LogLevel.DEBUG);
    this.logger.info('Component initialized');
    this.logger.debug('Debug information', { data: 'example' });
  }
}
```

## 📚 Components

### ButtonComponent

**Selector:** `lib-button`

**Inputs:**
- `variant`: 'primary' | 'secondary' | 'success' (default: 'primary')
- `disabled`: boolean (default: false)
- `type`: 'button' | 'submit' | 'reset' (default: 'button')

**Outputs:**
- `clicked`: EventEmitter<Event>

**Example:**
```html
<lib-button variant="success" (clicked)="onSave()">
  Save
</lib-button>
```

### CardComponent

**Selector:** `lib-card`

**Inputs:**
- `title`: string (optional)
- `elevated`: boolean (default: false)
- `hasFooter`: boolean (default: false)

**Example:**
```html
<lib-card title="My Card" [elevated]="true" [hasFooter]="true">
  <p>Card content goes here</p>
  <div footer>Footer content</div>
</lib-card>
```

## 🛠️ Services

### LoggerService

A configurable logging service with different log levels.

**Methods:**
- `setLogLevel(level: LogLevel): void`
- `debug(message: string, ...args: any[]): void`
- `info(message: string, ...args: any[]): void`
- `warn(message: string, ...args: any[]): void`
- `error(message: string, ...args: any[]): void`

## 🔧 Development

### Build the library

```bash
npm install
npm run build
```

### Publish to npm

```bash
# Login to npm
npm login

# Publish
npm publish
```

## 📝 Notes

- Change `@your-scope` to your actual npm username or organization
- Update the repository URL in package.json
- Add your name in the author field

## 📄 License

MIT
