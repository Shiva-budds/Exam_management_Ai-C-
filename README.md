# Exam Management with AI

A full-stack exam management system built with Angular (frontend) and ASP.NET Core (backend), featuring AI-powered capabilities.

## Tech Stack

- **Frontend:** Angular 21, TypeScript, Reactive Forms
- **Backend:** ASP.NET Core, Entity Framework Core
- **Database:** SQL Server
- **Version Control:** Git + GitHub

## Project Structure

\\\
Exam_Management_With_AI/
+-- Exam_Management_With_AI/   # ASP.NET Core backend
¦   +-- Program.cs
¦   +-- appsettings.json
+-- Frontend/                  # Angular frontend
    +-- src/
    ¦   +-- app/
    ¦       +-- validation_pages/
    ¦       ¦   +-- login/
    ¦       ¦   +-- signup/
    ¦       +-- services.ts
    +-- package.json
\\\

## Setup & Installation

### Backend
1. Open the solution in Visual Studio or VS Code
2. Update the connection string in \ppsettings.json\
3. Run database migrations:
   \\\ash
   dotnet ef database update
   \\\
4. Start the backend:
   \\\ash
   dotnet run
   \\\

### Frontend
1. Navigate to the Frontend folder:
   \\\ash
   cd Frontend
   \\\
2. Install dependencies:
   \\\ash
   npm install
   \\\
3. Start the dev server:
   \\\ash
   ng serve
   \\\
4. Open your browser at \http://localhost:4200\

## Notes
- Make sure the backend is running before starting the frontend
- Default backend runs on \http://localhost:5141\
- Avoid placing the project in a path containing special characters (e.g. \#\)
