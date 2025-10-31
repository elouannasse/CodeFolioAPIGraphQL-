# Portfolio GraphQL API

A modern, scalable GraphQL API built with **Node.js (v22+)**, **TypeScript**, **Apollo Server**, and **MongoDB (v8+)** for managing a developer portfolio.

##  Features

- ✅ **GraphQL API** with Apollo Server
- ✅ **JWT Authentication** (Login/Logout)
- ✅ **Role-Based Access Control** (Admin & Visitor)
- ✅ **Complete CRUD Operations** for:
  - Profile (with social media links)
  - Projects
  - Experiences
  - Competences (Skills)
  - Education
- ✅ **Modular Architecture** (Separated schemas, services, and resolvers)
- ✅ **MongoDB 8.x** with Mongoose
- ✅ **TypeScript** with path aliases
- ✅ **Security**: Helmet, CORS, JWT
- ✅ **Error Handling** with custom error classes
- ✅ **Logging** with Winston
- ✅ **Database Seeding**

##  Requirements

- **Node.js**: v22.0.0 or higher
- **npm**: v10.0.0 or higher
- **MongoDB**: v8.x (latest)

##  Installation

### 1. Install Dependencies

```powershell
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**

```powershell
# Install MongoDB 8.x from https://www.mongodb.com/try/download/community
# Start MongoDB service
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**

- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string and update `.env` file

### 3. Configure Environment Variables

Copy the example environment file:

```powershell
Copy-Item .env.example .env
```

Update `.env` with your configuration:

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123456
```

### 4. Seed Database (Create Admin User)

```powershell
npm run seed
```

This creates an admin user with credentials from your `.env` file.

##  Running the Project

### Development Mode

```powershell
npm run dev
```

### Production Mode

```powershell
npm run build
npm start
```

The server will start at: **http://localhost:4000**

- GraphQL Playground: **http://localhost:4000/graphql**
- Health Check: **http://localhost:4000/health**

##  API Documentation

### Authentication

#### Login (Get JWT Token)

```graphql
mutation Login {
  login(input: { email: "admin@portfolio.com", password: "Admin@123456" }) {
    token
    user {
      id
      username
      email
      role
    }
  }
}
```

#### Get Current User (Protected)

```graphql
query Me {
  me {
    id
    username
    email
    role
  }
}
```

**Headers:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Profile Management

#### Get Profile (Public)

```graphql
query GetProfil {
  getProfil {
    id
    fullName
    title
    bio
    avatar
    email
    phone
    location
    socials {
      platform
      url
      icon
    }
    resume
  }
}
```

#### Create Profile (Protected - Admin)

```graphql
mutation CreateProfil {
  createProfil(
    input: {
      fullName: "John Doe"
      title: "Full Stack Developer"
      bio: "Passionate developer with 5+ years experience"
      email: "john@example.com"
      phone: "+1234567890"
      location: "New York, USA"
      socials: [
        { platform: github, url: "https://github.com/johndoe" }
        { platform: linkedin, url: "https://linkedin.com/in/johndoe" }
      ]
    }
  ) {
    id
    fullName
    title
  }
}
```

#### Update Profile (Protected - Owner/Admin)

```graphql
mutation UpdateProfil {
  updateProfil(
    id: "PROFILE_ID"
    input: { bio: "Updated bio", phone: "+9876543210" }
  ) {
    id
    bio
    phone
  }
}
```

### Projects Management

#### Get All Projects (Public)

```graphql
query GetProjets {
  getProjets {
    id
    title
    description
    image
    technologies
    demoUrl
    githubUrl
    category
    featured
    status
  }
}
```

#### Get Featured Projects Only

```graphql
query GetFeaturedProjets {
  getProjets(featured: true) {
    id
    title
    featured
  }
}
```

#### Create Project (Protected - Admin)

```graphql
mutation CreateProjet {
  createProjet(
    input: {
      title: "E-commerce Platform"
      description: "A full-stack e-commerce solution"
      technologies: ["React", "Node.js", "MongoDB", "GraphQL"]
      category: fullstack
      featured: true
      demoUrl: "https://demo.example.com"
      githubUrl: "https://github.com/user/project"
      status: completed
    }
  ) {
    id
    title
    technologies
  }
}
```

#### Update Project (Protected - Owner/Admin)

```graphql
mutation UpdateProjet {
  updateProjet(
    id: "PROJECT_ID"
    input: { title: "Updated Title", featured: false }
  ) {
    id
    title
    featured
  }
}
```

#### Delete Project (Protected - Owner/Admin)

```graphql
mutation DeleteProjet {
  deleteProjet(id: "PROJECT_ID")
}
```

### Experience Management

#### Get All Experiences (Public)

```graphql
query GetExperiences {
  getExperiences {
    id
    company
    position
    description
    location
    employmentType
    startDate
    endDate
    isCurrent
    technologies
  }
}
```

#### Create Experience (Protected - Admin)

```graphql
mutation CreateExperience {
  createExperience(
    input: {
      company: "Tech Corp"
      position: "Senior Developer"
      description: "Led development of microservices"
      location: "Remote"
      employmentType: full_time
      startDate: "2020-01-01"
      isCurrent: true
      technologies: ["Node.js", "React", "Docker"]
    }
  ) {
    id
    company
    position
  }
}
```

### Competences (Skills) Management

#### Get All Competences (Public)

```graphql
query GetCompetences {
  getCompetences {
    id
    name
    category
    level
    icon
    yearsOfExperience
    description
  }
}
```

#### Get Competences by Category

```graphql
query GetProgrammingLanguages {
  getCompetences(category: programming_language) {
    id
    name
    level
  }
}
```

#### Create Competence (Protected - Admin)

```graphql
mutation CreateCompetence {
  createCompetence(
    input: {
      name: "TypeScript"
      category: programming_language
      level: advanced
      yearsOfExperience: 3
      description: "Strongly typed JavaScript"
    }
  ) {
    id
    name
    level
  }
}
```

### Education Management

#### Get All Education (Public)

```graphql
query GetEducations {
  getEducations {
    id
    institution
    degree
    fieldOfStudy
    description
    startDate
    endDate
    isCurrent
    grade
    location
  }
}
```

#### Create Education (Protected - Admin)

```graphql
mutation CreateEducation {
  createEducation(
    input: {
      institution: "University of Technology"
      degree: "Bachelor of Science"
      fieldOfStudy: "Computer Science"
      description: "Focused on software engineering"
      startDate: "2015-09-01"
      endDate: "2019-06-01"
      isCurrent: false
      grade: "3.8 GPA"
      location: "Boston, MA"
    }
  ) {
    id
    institution
    degree
  }
}
```

### Portfolio (All Data in One Query)

#### Get Complete Portfolio (Public)

```graphql
query GetPortfolio {
  getPortfolio {
    profil {
      fullName
      title
      bio
      socials {
        platform
        url
      }
    }
    projets {
      id
      title
      technologies
      featured
    }
    experiences {
      id
      company
      position
    }
    competences {
      id
      name
      category
      level
    }
    educations {
      id
      institution
      degree
    }
  }
}
```

## 🔐 Authorization

### Roles

- **Visitor**: Read-only access to public queries
- **Admin**: Full CRUD access to all resources

### Protected Endpoints

All **mutations** (Create/Update/Delete) require authentication via JWT token.

**How to authenticate:**

1. Login to get JWT token
2. Add header to all requests:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

##  Project Structure

```
CodeFolioAPIGraphQL/
├── src/
│   ├── config/
│   │   ├── database.ts          # MongoDB connection
│   │   ├── environment.ts       # Environment variables
│   │   ├── logger.ts            # Winston logger
│   │   └── seed.ts              # Database seeding
│   ├── graphql/
│   │   ├── context/
│   │   │   └── auth.context.ts  # GraphQL context & RBAC
│   │   └── schema/
│   │       ├── index.ts         # Merged schemas & resolvers
│   │       ├── portfolio.schema.ts
│   │       └── portfolio.resolvers.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.model.ts    # User model
│   │   │   ├── auth.schema.ts   # Auth GraphQL schema
│   │   │   ├── auth.service.ts  # Auth business logic
│   │   │   ├── auth.resolvers.ts # Auth resolvers
│   │   │   ├── education.model.ts
│   │   │   ├── education.schema.ts
│   │   │   ├── education.service.ts
│   │   │   └── education.resolvers.ts
│   │   ├── profil/
│   │   │   ├── profil.model.ts
│   │   │   ├── profil.schema.ts
│   │   │   ├── profil.service.ts
│   │   │   └── profil.resolvers.ts
│   │   ├── projet/
│   │   ├── experience/
│   │   └── competence/
│   ├── shared/
│   │   ├── errors/
│   │   │   └── AppError.ts      # Custom error classes
│   │   └── utils/
│   │       └── jwt.helper.ts    # JWT utilities
│   ├── index.ts                 # Application entry point
│   └── server.ts                # Apollo Server setup
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing with Postman

### Import to Postman

1. Open Postman
2. Create new request
3. Set method to `POST`
4. URL: `http://localhost:4000/graphql`
5. Body > GraphQL
6. Paste queries from documentation above

### Authentication Flow

1. **Step 1**: Login

   ```graphql
   mutation {
     login(input: { email: "admin@portfolio.com", password: "Admin@123456" }) {
       token
     }
   }
   ```

2. **Step 2**: Copy the token from response

3. **Step 3**: Add token to Headers

   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_HERE`

4. **Step 4**: Make protected requests

## 🔧 Environment Variables

| Variable         | Description                          | Default                             |
| ---------------- | ------------------------------------ | ----------------------------------- |
| `PORT`           | Server port                          | 4000                                |
| `NODE_ENV`       | Environment (development/production) | development                         |
| `MONGODB_URI`    | MongoDB connection string            | mongodb://localhost:27017/portfolio |
| `JWT_SECRET`     | Secret key for JWT signing           | -                                   |
| `JWT_EXPIRES_IN` | JWT expiration time                  | 7d                                  |
| `ADMIN_EMAIL`    | Admin user email                     | admin@portfolio.com                 |
| `ADMIN_PASSWORD` | Admin user password                  | Admin@123456                        |

## 📝 Scripts

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start development server with hot reload |
| `npm run build` | Build for production                     |
| `npm start`     | Start production server                  |
| `npm run seed`  | Seed database with admin user            |
| `npm test`      | Run tests                                |
| `npm run lint`  | Lint code                                |

## 🛡️ Security Features

-  JWT Authentication
-  Password hashing with bcrypt
-  Helmet.js for HTTP headers
-  CORS configuration
-  Role-based access control (RBAC)
-  Input validation
-  Error handling

##  Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED
```

**Solution**: Make sure MongoDB is running

```powershell
net start MongoDB
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::4000
```

**Solution**: Change PORT in `.env` or kill the process using port 4000

### JWT Token Invalid

**Solution**: Make sure to include `Bearer` prefix in Authorization header

##  License

ISC

##  Author

Portfolio GraphQL API

---

**Built with  using Node.js 22+, TypeScript, Apollo Server, and MongoDB 8+**
