# Blog Application

A full-stack blog application with a React frontend and Node.js/Express backend.

## Project Structure

```
blog-app/
├── backend/        # Express, TypeScript, MongoDB backend
└── frontend/       # React, Vite, TypeScript frontend
```

## Backend Setup

The backend is built with Node.js, Express, TypeScript, and MongoDB.

### Prerequisites

- Node.js (v16+)
- MongoDB instance (local or remote)

### Installation

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-app
   NODE_ENV=development
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. For production build:
   ```
   npm run build
   npm start
   ```

### Testing

Run tests using Jest:
```
npm test
```

For watch mode:
```
npm run test:watch
```

For test coverage:
```
npm run test:coverage
```

## Frontend Setup

The frontend is built with React, TypeScript, and Vite.

### Prerequisites

- Node.js (v16+)

### Installation

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. For production build:
   ```
   npm run build
   npm run preview
   ```

### Linting

```
npm run lint
```

## Features

- Create, read, update, and delete blog posts
- View individual post details
- Responsive design for various screen sizes

## API Endpoints

| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| GET    | /api/posts     | Get all posts         |
| GET    | /api/posts/:id | Get a specific post   |
| POST   | /api/posts     | Create a new post     |
| PUT    | /api/posts/:id | Update a specific post|
| DELETE | /api/posts/:id | Delete a specific post|

## Technologies

### Backend
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- Jest for testing

### Frontend
- React 19
- TypeScript
- React Router v7
- Axios for API requests
- Vite build tool

## License

ISC