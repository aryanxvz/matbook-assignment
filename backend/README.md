# Dynamic Form Builder - Backend

Node.js/Express backend API for the dynamic form builder system.

## Features

- RESTful API design
- TypeScript for type safety
- In-memory data storage
- Request validation
- Error handling middleware
- CORS support

## API Documentation

### Endpoints

#### GET /api/form-schema
Returns the Employee Onboarding form schema with all field definitions.

#### POST /api/submissions
Validates and stores form submissions.

#### GET /api/submissions
Returns paginated list of submissions with sorting support.

#### GET /api/submissions/:id
Returns a single submission by ID.

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file:
````
PORT=3000
````