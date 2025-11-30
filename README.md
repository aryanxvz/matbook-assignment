# Dynamic Form Builder - Full Stack Application

A full-stack dynamic form builder system with React frontend and Node.js backend.

---

## 📋 Milestone Completion Status

### ✅ Milestone 1 - Frontend Development
- [x] Dynamic Form Page with TanStack Form
- [x] Form Schema Fetching with TanStack Query
- [x] All 8 field types implemented (text, number, select, multi-select, date, textarea, switch)
- [x] Inline validation with error messages
- [x] Loading and error states
- [x] Submissions Table with TanStack Table
- [x] Server-side pagination
- [x] Server-side sorting
- [x] View submission modal

### ✅ Milestone 2 - Backend Development
- [x] GET /api/form-schema endpoint
- [x] POST /api/submissions endpoint with validation
- [x] GET /api/submissions endpoint with pagination and sorting
- [x] In-memory data storage
- [x] Proper error handling and status codes
- [x] CORS support

---

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **TanStack Query** (React Query) - Server state management
- **TanStack Table** - Table rendering
- **TanStack Form** - Form state management
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** with Express
- **TypeScript**
- In-memory data storage
- CORS enabled

---

## Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── schema/
│   │   ├── store/
│   │   ├── utils/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## Setup and Run Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend server will start on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will start on `http://localhost:5173`

### Running Both Simultaneously

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## API Endpoints

### `GET /api/form-schema`

Returns the Employee Onboarding form schema.

**Response:**
```json
{
  "title": "Employee Onboarding",
  "description": "Please fill out this form to complete your onboarding process",
  "fields": [...]
}
```

### `POST /api/submissions`

Submits form data with validation.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  ...
}
```

**Success Response (201):**
```json
{
  "success": true,
  "id": "SUB000001",
  "createdAt": "2025-11-27T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "errors": {
    "email": "Email Address format is invalid"
  }
}
```

### `GET /api/submissions`

Returns paginated and sorted submissions.

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10, max: 100)
- `sortBy` (only "createdAt" supported)
- `sortOrder` ("asc" or "desc", default: "desc")

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

## Features

### Form Validation
- Required field validation
- Min/max length for text fields
- Email format validation (regex)
- Number range validation
- Date minimum validation
- Multi-select min/max selections
- Real-time inline error messages

### Form Fields

1. **Text Input** - Full Name with length validation
2. **Email Input** - Email with regex validation
3. **Number Input** - Age with range validation
4. **Select Dropdown** - Department selection
5. **Multi-Select Checkboxes** - Skills with selection limits
6. **Date Picker** - Start Date with minimum date
7. **Textarea** - Bio with character limit
8. **Switch/Toggle** - Terms acceptance

### Submissions Table
- Paginated data display
- Sortable by creation date
- Items per page selector (10/20/50)
- View submission details in modal
- Loading and error states
- Empty state handling

---

## ⚠️ Known Issues

- Data is stored in memory and will be lost on server restart
- No authentication/authorization implemented
- No data persistence to database

---

## 📝 Assumptions

- Single form schema (Employee Onboarding)
- Backend runs on port 3000
- Frontend runs on port 5173
- CORS is enabled for all origins in development
- Date fields accept ISO format strings
- Multi-select returns array of values
- Submission IDs are auto-generated with format SUB000001

---

## 🔮 Future Enhancements

- CSV export functionality
- Edit/delete submissions
- Search and filter submissions
- Dark mode support
- Database persistence (SQLite/PostgreSQL)
- Form schema editor
- Multiple form templates
- User authentication