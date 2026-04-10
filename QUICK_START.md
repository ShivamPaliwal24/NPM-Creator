# 🚀 Quick Start Commands

## Initial Setup (Do Once)

```bash
# 1. Install dependencies
npm install

# 2. Customize package.json - Change these:
#    - "name": "@your-npm-username/your-library-name"
#    - "author": "Your Name"
#    - "description": "Your description"

# 3. Build the library
npm run build
```

## Test Locally (Before Publishing to npm)

```bash
# In library directory (D:\NPM Creator)
npm pack

# In your Angular project
npm install D:\NPM Creator\your-scope-angular-ui-library-1.0.0.tgz

# Use in your Angular component
import { ButtonComponent } from '@your-scope/angular-ui-library';
```

## Publish to npm

```bash
# First time only
npm login

# Publish
npm publish --access public
```

## Install in Other Projects

```bash
npm install @your-scope/angular-ui-library
```

## Quick Usage Example

```typescript
import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, LoggerService } from '@your-scope/angular-ui-library';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <lib-card title="Hello" [elevated]="true">
      <p>Using my custom npm library!</p>
      <lib-button (clicked)="test()">Click</lib-button>
    </lib-card>
  `
})
export class DemoComponent {
  constructor(private logger: LoggerService) {}
  
  test() {
    this.logger.info('It works!');
  }
}
```

## Folder Structure

```
D:\NPM Creator\
├── src/                          # Source code
│   ├── components/
│   │   ├── button/              # Button component
│   │   └── card/                # Card component
│   ├── services/
│   │   └── logger.service.ts    # Logger service
│   └── index.ts                 # Public API exports
├── dist/                        # Built files (after npm run build)
├── package.json                 # Package configuration
├── tsconfig.json               # TypeScript config
└── README.md                   # Documentation
```

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run build` | Build the library |
| `npm pack` | Create .tgz file for local testing |
| `npm publish` | Publish to npm registry |
| `npm version patch` | Bump version (1.0.0 → 1.0.1) |
| `npm version minor` | Bump version (1.0.0 → 1.1.0) |
| `npm version major` | Bump version (1.0.0 → 2.0.0) |

## Troubleshooting

**Build fails?**
```bash
npm install
npm run build
```

**Can't publish?**
```bash
npm login
npm publish --access public
```

**Name taken?**
- Change package name in package.json to something unique

**Want to unpublish?**
```bash
npm unpublish @your-scope/package-name@1.0.0
```

## Next Steps

1. ✅ Customize package.json with your name/scope
2. ✅ Run `npm install` and `npm run build`
3. ✅ Test locally with `npm pack`
4. ✅ Publish with `npm publish --access public`
5. ✅ Install in your projects and enjoy! 🎉
