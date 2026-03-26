# Estate Community App - Backend API

A comprehensive Node.js + Express.js + MongoDB backend for managing community/estate operations including residents, homes, transactions, events, announcements, and maintenance requests.

## 🎯 Features

- **User Authentication**: JWT-based authentication with refresh tokens and role-based access control
- **User Management**: Complete user directory with profile management and status control
- **Home Management**: Track properties with owners, occupants, and payment status
- **Financial Tracking**: Transaction history, bills, financial summaries, and payment tracking
- **Event Management**: Community events with attendee tracking and budget management
- **Announcements**: Priority-based announcements with engagement metrics (views, likes)
- **Maintenance Requests**: Request tracking with status, priority, and cost management
- **Role-Based Access**: Admin, Treasurer, Secretary, Moderator, and Resident roles

## 🏗️ Architecture

    src/
    ├── config/              # Database and environment configuration
    ├── models/              # MongoDB schemas and models
    ├── controllers/         # Request handlers and business logic routing
    ├── services/            # Business logic and data operations
    ├── routes/              # API route definitions
    ├── middleware/          # Authentication, validation, error handling
    ├── utils/               # Utility functions and validators
    ├── types/               # TypeScript type definitions
    ├── scripts/             # Database seeding
    └── server.ts            # Express server setup

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- MongoDB 4.4 or higher (local or cloud instance like MongoDB Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository:

    git clone <repo-url>
    cd estate-community-backend

2. Install dependencies:

    npm install

3. Create .env file:

    cp .env.example .env

4. Configure your environment variables in .env:

    NODE_ENV=development
    PORT=5000
    API_URL=http://localhost:5000
    MONGODB_URI=mongodb://localhost:27017/estate-community
    JWT_SECRET=your_secret_key_here
    REFRESH_TOKEN_SECRET=your_refresh_secret_here

5. Start MongoDB (if using local installation):

    mongod

6. Seed the database (optional):

    npm run seed

7. Start the development server:

    npm run dev

The server will start on http://localhost:5000

## 📚 API Endpoints

### Authentication

    POST /api/auth/register        - Register new user
    POST /api/auth/login           - Login user
    POST /api/auth/refresh-token   - Refresh JWT token
    GET  /api/auth/profile         - Get current user profile
    PUT  /api/auth/profile         - Update user profile
    POST /api/auth/logout          - Logout user
    POST /api/auth/verify-email    - Verify email address

### Users

    GET  /api/users                - Get all users (admin only)
    GET  /api/users/:id            - Get user by ID
    PUT  /api/users/:id            - Update user
    DELETE /api/users/:id          - Delete user (admin only)
    PATCH /api/users/:id/toggle-active - Toggle user active status

### Homes

    POST   /api/homes              - Create home (treasurer/admin)
    GET    /api/homes              - Get all homes
    GET    /api/homes/:id          - Get home by ID
    GET    /api/homes/street/:street - Get homes by street
    PUT    /api/homes/:id          - Update home (treasurer/admin)
    POST   /api/homes/:id/occupants - Add occupant
    DELETE /api/homes/:id/occupants - Remove occupant
    DELETE /api/homes/:id          - Delete home (treasurer/admin)

### Transactions

    POST   /api/transactions       - Create transaction (treasurer/admin)
    GET    /api/transactions       - Get all transactions
    GET    /api/transactions/summary - Get financial summary
    GET    /api/transactions/:id   - Get transaction by ID
    GET    /api/transactions/home/:homeId - Get home transactions
    GET    /api/transactions/category/:category - Get category transactions
    PUT    /api/transactions/:id   - Update transaction (treasurer/admin)
    DELETE /api/transactions/:id   - Delete transaction (treasurer/admin)

### Bills

    POST   /api/bills              - Create bill (treasurer/admin)
    GET    /api/bills              - Get all bills
    GET    /api/bills/unpaid       - Get unpaid bills
    GET    /api/bills/:id          - Get bill by ID
    GET    /api/bills/home/:homeId - Get home bills
    PUT    /api/bills/:id          - Update bill (treasurer/admin)
    DELETE /api/bills/:id          - Delete bill (treasurer/admin)

### Events

    POST   /api/events             - Create event (secretary/moderator/admin)
    GET    /api/events             - Get all events
    GET    /api/events/upcoming    - Get upcoming events
    GET    /api/events/:id         - Get event by ID
    PUT    /api/events/:id         - Update event (secretary/moderator/admin)
    POST   /api/events/:id/attendees - Add event attendee
    DELETE /api/events/:id/attendees - Remove event attendee
    DELETE /api/events/:id         - Delete event (secretary/moderator/admin)

### Announcements

    POST   /api/announcements      - Create announcement (secretary/moderator/admin)
    GET    /api/announcements      - Get all announcements
    GET    /api/announcements/:id  - Get announcement by ID
    GET    /api/announcements/priority/:priority - Get by priority
    POST   /api/announcements/:id/like - Like announcement
    POST   /api/announcements/:id/unlike - Unlike announcement
    PUT    /api/announcements/:id  - Update announcement (secretary/moderator/admin)
    DELETE /api/announcements/:id  - Delete announcement (secretary/moderator/admin)

### Maintenance

    POST   /api/maintenance        - Create maintenance request
    GET    /api/maintenance        - Get all maintenance requests
    GET    /api/maintenance/:id    - Get request by ID
    GET    /api/maintenance/status/:status - Get by status
    GET    /api/maintenance/priority/:priority - Get by priority
    POST   /api/maintenance/:id/assign - Assign request (treasurer/admin)
    PUT    /api/maintenance/:id    - Update request (treasurer/admin)
    DELETE /api/maintenance/:id    - Delete request (treasurer/admin)

### Health Check

    GET  /api/health               - API health status

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

    Authorization: Bearer <token>

Tokens are issued upon login and expire based on JWT_EXPIRE setting. Use the refresh token endpoint to obtain a new token.

## 📊 Database Models

### User

- name, email, phone, password
- role (admin, treasurer, secretary, moderator, resident)
- profileImage, houseNumber, street
- isActive, isEmailVerified
- timestamps (createdAt, updatedAt)

### Home

- houseNumber, street
- owner (User reference)
- occupants (User references array)
- monthlyDue, totalPaid, balance
- paymentStatus (paid, unpaid, partial, overdue)
- timestamps

### Transaction

- title, description, amount
- type (credit, debit), category
- date, status (completed, pending, failed)
- homeId, createdBy (User reference)
- attachment (optional)
- timestamps

### Bill

- homeId (Home reference)
- amount, dueDate
- type, description, isPaid
- timestamps

### Event

- title, description
- startDate, endDate, location
- status (upcoming, ongoing, completed, cancelled)
- image, attendees, organizer (User reference)
- estimatedBudget, actualBudget
- timestamps

### Announcement

- title, content, priority
- category, image
- author (User reference), authorRole
- views, likes, likedBy (User references)
- timestamps

### MaintenanceRequest

- title, description, category, priority
- status, location
- requesterName, requesterPhone, requesterEmail
- images, assignedTo (User reference)
- estimatedCost, actualCost, completionDate
- notes, timestamps

## 🛠️ Development

### Build TypeScript

    npm run build

### Watch for changes

    npm run watch

### Run tests

    npm test

### Lint code

    npm run lint

## 🔄 Available Scripts

    npm run start          - Run production build
    npm run dev           - Run development server with auto-reload
    npm run build         - Compile TypeScript to JavaScript
    npm run watch         - Watch TypeScript for changes
    npm run test          - Run test suite
    npm run lint          - Lint TypeScript files
    npm run seed          - Seed database with sample data

## 📋 Request/Response Format

### Success Response

    {
      "success": true,
      "message": "Operation successful",
      "data": {
        ...
      }
    }

### Error Response

    {
      "success": false,
      "message": "Error description",
      "error": "Detailed error information"
    }

### Paginated Response

    {
      "success": true,
      "message": "Operation successful",
      "data": {
        "data": [...],
        "pagination": {
          "page": 1,
          "limit": 10,
          "total": 50,
          "pages": 5
        }
      }
    }

## 🔑 Environment Variables

    NODE_ENV              - Environment (development/production/test)
    PORT                  - Server port
    API_URL               - API base URL
    MONGODB_URI           - MongoDB connection string
    JWT_SECRET            - JWT signing key
    JWT_EXPIRE            - JWT expiration time
    REFRESH_TOKEN_SECRET  - Refresh token signing key
    REFRESH_TOKEN_EXPIRE  - Refresh token expiration
    RATE_LIMIT_WINDOW_MS  - Rate limit window in milliseconds
    RATE_LIMIT_MAX_REQUESTS - Max requests per window

## 🧪 Seeding the Database

Run the seed script to populate the database with sample data:

    npm run seed

This will create:

- 5 sample users with different roles
- 5 sample homes across different streets
- 4 sample transactions
- 3 sample bills
- 1 sample event
- 2 sample announcements
- 2 sample maintenance requests

## 📝 API Documentation

Endpoints are organized by resource type. Each endpoint supports:

- **Query Parameters**: page, limit, sort, search (where applicable)
- **Request Body**: JSON format with required and optional fields
- **Response**: Standardized JSON response with success, message, and data fields

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 🔒 Security

- Passwords are hashed using bcryptjs
- JWT tokens expire automatically
- Rate limiting prevents abuse
- Input validation with Joi schemas
- CORS enabled for frontend communication
- Helmet.js for security headers

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For issues, questions, or contributions, please contact the development team.
