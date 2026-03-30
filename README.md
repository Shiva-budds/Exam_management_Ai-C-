# Exam Management with AI

A full-stack exam management system built with Angular (frontend) and ASP.NET Core (backend), featuring AI-powered capabilities.

## Tech Stack

- **Frontend:** Angular 21, TypeScript, Reactive Forms
- **Backend:** ASP.NET Core, Entity Framework Core
- **Database:** SQL Server
- **Version Control:** Git + GitHub

## Project Structure
```
Exam_Management_With_AI/
├── Exam_Management_With_AI/   # ASP.NET Core backend
│   ├── Program.cs
│   └── appsettings.json
└── Frontend/                  # Angular frontend
    ├── src/app/
    │   ├── validation_pages/
    │   │   ├── login/
    │   │   └── signup/
    │   └── services.ts
    └── package.json
```

## Setup & Installation

### Backend
1. Open the solution in Visual Studio or VS Code
2. Update the connection string in `appsettings.json`
3. Run migrations: `dotnet ef database update`
4. Start the server: `dotnet run`

### Frontend
1. `cd Frontend`
2. `npm install`
3. `ng serve`
4. Open `http://localhost:4200`

## Notes
- Make sure the backend is running before starting the frontend
- Default backend runs on `http://localhost:5141`
- Avoid placing the project in a path containing special characters like `#`
