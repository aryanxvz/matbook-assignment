# Dynamic Form Builder - Frontend

React/TypeScript frontend application for the dynamic form builder system.

## Features

- Dynamic form rendering from API schema
- Real-time validation
- Submissions table with pagination
- Responsive design with Tailwind CSS
- Server state management with TanStack Query

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Environment Variables

Create a `.env` file:
````
VITE_API_URL=http://localhost:3000/api
````

## Components

- **FormField** - Reusable field component supporting all 8 field types
- **DynamicForm** - Main form page with validation
- **Submissions** - Table page with pagination and sorting