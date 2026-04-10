# Spring Boot + Angular Integration Guide

## Architecture Overview

```
┌─────────────────────────────────────────┐
│         Spring Boot Backend             │
│         (Java - Port 8080)              │
│  ┌──────────────────────────────────┐  │
│  │   REST API Controllers            │  │
│  │   - /api/users                    │  │
│  │   - /api/products                 │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    ↕ HTTP/REST
┌─────────────────────────────────────────┐
│      Angular Frontend (Port 4200)      │
│  ┌──────────────────────────────────┐  │
│  │  Your Components                  │  │
│  │  + UI Library Components          │  │
│  │    (ButtonComponent, CardComponent)│  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Setup Instructions

### 1. Spring Boot Backend Setup

**Project Structure:**
```
spring-boot-app/
├── src/main/java/
│   └── com/example/demo/
│       ├── DemoApplication.java
│       ├── controller/
│       │   └── UserController.java
│       └── model/
│           └── User.java
└── pom.xml
```

**Enable CORS in Spring Boot:**

```java
// src/main/java/com/example/demo/config/WebConfig.java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

**Sample Controller:**

```java
// src/main/java/com/example/demo/controller/UserController.java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public List<User> getUsers() {
        return Arrays.asList(
            new User(1L, "John Doe"),
            new User(2L, "Jane Smith")
        );
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return user;
    }
}
```

### 2. Angular Frontend Setup

**Install your library:**
```bash
npm install @your-scope/angular-ui-library
```

**Create a service to call Spring Boot API:**

```typescript
// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from '@your-scope/angular-ui-library';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  getUsers(): Observable<User[]> {
    this.logger.info('Fetching users from API');
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    this.logger.info('Creating user', user);
    return this.http.post<User>(this.apiUrl, user);
  }
}
```

**Use library components with API data:**

```typescript
// src/app/components/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, ButtonComponent } from '@your-scope/angular-ui-library';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <lib-card title="User Management" [elevated]="true" [hasFooter]="true">
      <div class="user-list">
        <div *ngFor="let user of users" class="user-item">
          {{ user.name }}
        </div>
      </div>
      
      <div footer>
        <lib-button 
          variant="primary" 
          (clicked)="loadUsers()">
          Refresh Users
        </lib-button>
        <lib-button 
          variant="success" 
          (clicked)="addUser()">
          Add User
        </lib-button>
      </div>
    </lib-card>
  `,
  styles: [`
    .user-list { padding: 10px 0; }
    .user-item { padding: 8px; border-bottom: 1px solid #eee; }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
  }

  addUser() {
    const newUser = { id: 0, name: 'New User' };
    this.userService.createUser(newUser).subscribe(
      user => this.users.push(user)
    );
  }
}
```

### 3. Running Both Applications

**Terminal 1 - Spring Boot:**
```bash
cd spring-boot-app
mvn spring-boot:run
# Runs on http://localhost:8080
```

**Terminal 2 - Angular:**
```bash
cd angular-app
npm install
ng serve
# Runs on http://localhost:4200
```

## Deployment Options

### Option 1: Separate Deployment
- Deploy Spring Boot to cloud (AWS, Heroku, etc.)
- Deploy Angular to Netlify/Vercel
- Update API URL in Angular

### Option 2: Embedded Deployment
- Build Angular: `ng build --prod`
- Copy `dist/` to `spring-boot-app/src/main/resources/static/`
- Access everything through Spring Boot on port 8080

## Benefits of Using This Library

✅ **Consistent UI** across all your Angular projects  
✅ **Reusable components** - write once, use everywhere  
✅ **Easy updates** - update library version, all projects benefit  
✅ **Shared services** like LoggerService for consistent logging  
✅ **Works with any backend** - Spring Boot, Node.js, .NET, etc.
