# Testing Guide

## Manual Testing Steps

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
```
Verify: Server should start on http://localhost:3000

### 2. Test Backend Endpoints

**Test Schema Endpoint:**
```bash
curl http://localhost:3000/api/form-schema
```
Should return form schema JSON.

**Test Submissions Endpoint:**
```bash
curl http://localhost:3000/api/submissions
```
Should return empty submissions list.

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Verify: App should start on http://localhost:5173

### 4. Test Form Submission

1. Open http://localhost:5173
2. Fill out the form with valid data
3. Click Submit
4. Should redirect to submissions page
5. Verify submission appears in table

### 5. Test Validation

Try submitting with:
- Empty required fields - should show error
- Invalid email - should show error
- Age < 18 or > 65 - should show error
- Select more than 5 skills - should show error

### 6. Test Submissions Table

1. Navigate to /submissions
2. Verify pagination controls work
3. Click sort on "Created Date" column
4. Change items per page
5. Click "View" on a submission
6. Verify modal shows all data correctly