# Complete Usage Guide

## Step-by-Step: From Development to Installation

### Step 1: Setup & Customize Your Library

1. **Update package.json** - Change these fields:
   ```json
   "name": "@your-npm-username/my-library-name"
   "author": "Your Name"
   "description": "Your library description"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Step 2: Build Your Library

```bash
npm run build
```

This will create a `dist` folder with compiled JavaScript and TypeScript declaration files.

### Step 3: Test Locally (Before Publishing)

**Method A: Using npm pack**
```bash
# In your library directory (D:\NPM Creator)
npm pack
# This creates: your-scope-angular-ui-library-1.0.0.tgz

# In your Angular project
npm install D:\NPM Creator\your-scope-angular-ui-library-1.0.0.tgz
```

**Method B: Using npm link**
```bash
# In your library directory
npm link

# In your Angular project
npm link @your-scope/angular-ui-library
```

### Step 4: Publish to npm Registry

```bash
# First time: Create npm account at https://www.npmjs.com/signup

# Login
npm login

# Publish (make sure you're in D:\NPM Creator)
npm publish --access public
```

### Step 5: Install in Other Projects

```bash
# In any Angular project
npm install @your-scope/angular-ui-library
```

## 🎯 Using in Angular Project

### For Standalone Components (Angular 14+)

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, LoggerService } from '@your-scope/angular-ui-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <lib-card title="Dashboard" [elevated]="true">
      <p>Welcome to your application</p>
      <lib-button variant="primary" (clicked)="onAction()">
        Get Started
      </lib-button>
    </lib-card>
  `
})
export class AppComponent {
  constructor(private logger: LoggerService) {}
  
  onAction() {
    this.logger.info('User clicked button');
  }
}
```

### For Module-Based Applications

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonComponent, CardComponent } from '@your-scope/angular-ui-library';

@NgModule({
  imports: [
    BrowserModule,
    ButtonComponent,
    CardComponent
  ],
  // ... rest of your module
})
export class AppModule { }
```

## 🔄 Update & Republish

When you make changes:

```bash
# Update version in package.json (e.g., 1.0.0 -> 1.0.1)

# Rebuild
npm run build

# Republish
npm publish
```

## 🌐 Private npm Registry (Optional)

If using with Spring Boot or private projects:

```bash
# In your Angular project, create .npmrc file
registry=https://your-private-registry.com/
```

## ✅ Checklist Before Publishing

- [ ] Updated package name to your npm username/scope
- [ ] Updated author, description, repository URL
- [ ] Tested locally with `npm pack`
- [ ] Built successfully with `npm run build`
- [ ] Logged in to npm with `npm login`
- [ ] Ready to publish!

## 🚨 Troubleshooting

**Error: Package name already exists**
- Change the package name in package.json to something unique

**Error: 403 Forbidden**
- Make sure you're logged in: `npm login`
- Use `--access public` flag if using scoped package

**Import errors in Angular project**
- Run `npm install` again
- Check that you imported from the correct package name
- Restart Angular dev server
