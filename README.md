# Assignment1-2

A RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing posts and comments.

## Features

- **Posts Management**: Create, read, update, and query posts
- **Comments Management**: Create, read, update, delete, and filter comments by post
- **TypeScript Support**: Full TypeScript implementation for type safety
- **MongoDB Integration**: Persistent data storage using Mongoose ODM
- **RESTful Architecture**: Clean REST API design with proper HTTP methods
- **Testing**: Jest-based testing with Supertest for API integration tests

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/linoyniazov/Assignment1-2.git
   cd Assignment1-2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```env
   PORT=3000
   DB_CONNECT=mongodb://localhost:27017/assignment1
   ```

## Usage

### Development Mode

Run the server with hot reload using nodemon:

```bash
npm run dev
```

### Production Mode

Build and run the compiled JavaScript:

```bash
npm start
```

The server will start at `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Posts

| Method | Endpoint             | Description                           |
|--------|----------------------|---------------------------------------|
| POST   | `/post`              | Create a new post                     |
| GET    | `/post`              | Get all posts or filter by owner query param |
| GET    | `/post/getposts`     | Get all posts                         |
| GET    | `/post/:id`          | Get a post by ID                      |
| PUT    | `/post/:id`          | Update a post by ID                   |

**Query Parameters for GET `/post`:**
- `owner` - Filter posts by owner (e.g., `/post?owner=user123`)

#### Post Object

```json
{
  "title": "Post title",
  "content": "Post content",
  "owner": "owner123"
}
```

### Comments

| Method | Endpoint                  | Description                |
|--------|---------------------------|----------------------------|
| POST   | `/comments`               | Create a new comment       |
| GET    | `/comments/getcomments`   | Get all comments           |
| GET    | `/comments/:id`           | Get a comment by ID        |
| PUT    | `/comments/:id`           | Update a comment by ID     |
| DELETE | `/comments/:id`           | Delete a comment by ID     |

#### Comment Object

```json
{
  "comment": "Comment text",
  "owner": "owner123",
  "postId": "post-id-here"
}
```

## Scripts

| Script       | Description                              |
|--------------|------------------------------------------|
| `npm start`  | Build and run the production server      |
| `npm run dev`| Run in development mode with hot reload  |
| `npm test`   | Run Jest tests                           |
| `npm run lint` | Run ESLint for code linting            |

## Project Structure

```
├── src/
│   ├── app.ts              # Application entry point
│   ├── server.ts           # Express server configuration
│   ├── request.rest        # REST client requests for testing
│   ├── controllers/        # Request handlers
│   │   ├── base_controller.ts  # Generic CRUD controller
│   │   ├── post.ts             # Post controller
│   │   ├── comment.ts          # Comment controller
│   │   └── user.ts             # User controller
│   ├── models/             # Mongoose schemas
│   │   ├── post.ts             # Post model
│   │   ├── comment.ts          # Comment model
│   │   └── user.ts             # User model
│   ├── routes/             # API route definitions
│   │   ├── post.ts             # Post routes
│   │   ├── comment.ts          # Comment routes
│   │   └── user.ts             # User routes
│   └── tests/              # Test files
│       ├── post.test.ts
│       ├── comment.test.ts
│       ├── user.test.ts
│       ├── test_post.json      # Post test data
│       └── test_comment.json   # Comment test data
├── .env                    # Environment variables
├── package.json
├── tsconfig.json
├── jest.config.ts
└── eslint.config.js
```

## Testing

Run the test suite:

```bash
npm test
```

Tests are written using Jest and Supertest for HTTP assertions. Ensure MongoDB is running before executing tests.

## Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Testing**: Jest, Supertest
- **Linting**: ESLint with TypeScript support

## Authors

- Almog
- Linoy

## License

ISC
