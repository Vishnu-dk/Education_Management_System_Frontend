# Education Management System Frontend

A modern React-based frontend application for the Education Management System (EMS). The application provides role-based access for Students, Librarians, and Administrators to efficiently manage books, requests, issues, fines, and profiles through a clean and responsive user interface.

---

## Features

### Authentication
- JWT-based Authentication
- Role-Based Authorization
- Protected Routes
- Secure Logout

### Student Module
- Student Dashboard
- Browse Book Catalog
- Request Books
- View My Books
- Profile Management

### Librarian Module
- Dashboard Analytics
- Book Management
- Request Management
- Issue Management
- Fine Management
- Profile Management

### Administrator Module
- Dashboard Overview
- Book Management
- Request Management
- Issue Management
- User Management
- Profile Management

---

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Redux Toolkit
- RTK Query
- Chakra UI
- Recharts
- React Icons

### State Management
- Redux Toolkit
- RTK Query

### Styling
- Chakra UI
- Responsive Design
- Reusable Design System Components

---

## Project Structure

```text
src
│
├── components
│   │
│   ├── common
│   │   ├── BookCard.jsx
│   │   ├── ConfirmDialog.jsx
│   │   ├── CustomTable.jsx
│   │   ├── DataCard.jsx
│   │   ├── PageHeader.jsx
│   │   ├── SearchBar.jsx
│   │   └── StatusBadge.jsx
│   │
│   ├── dashboard
│   │   └── DashboardCharts.jsx
│   │
│   ├── forms
│   │   ├── AddBook.jsx
│   │   └── EditBook.jsx
│   │
│   ├── layout
│   │   ├── AppLayout.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   │
│   └── profile
│       ├── AdminProfileFields.jsx
│       ├── InfoCard.jsx
│       ├── ProfileLayout.jsx
│       └── StudentProfileFields.jsx
│
├── pages
│   │
│   ├── auth
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── student
│   │   ├── StudentDashboard.jsx
│   │   ├── BookCatalog.jsx
│   │   └── MyBooks.jsx
│   │
│   ├── librarian
│   │   ├── LibrarianDashboard.jsx
│   │   ├── BookManagement.jsx
│   │   ├── RequestManagement.jsx
│   │   └── IssueManagement.jsx
│   │
│   └── profile
│       └── ProfilePage.jsx
│
├── routes
│   └── AppRoutes.jsx
│
├── store
│   │
│   ├── api
│   │   ├── studentApi.js
│   │   └── librarianApi.js
│   │
│   └── store.js
│
├── App.jsx
└── main.jsx
```

---

## Installation

### Clone Repository

```bash
git clone <frontend-repository-url>
cd education-management-ui
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Application runs at:

```text
http://localhost:5173
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_BASE_URL=http://localhost:8080
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## Available Scripts

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## User Roles

### Student

```text
Dashboard
Book Catalog
My Books
Profile
```

### Librarian

```text
Dashboard
Book Management
Request Management
Issue Management
Profile
```

### Administrator

```text
Dashboard
Book Management
Request Management
Issue Management
User Management
Profile
```

---

## Reusable Components

### DataCard

Used for dashboard KPI metrics.

Examples:

```text
Books Issued
Pending Requests
Overdue Books
Revenue
Active Fines
```

---

### CustomTable

Reusable table component supporting:

- Loading States
- Empty States
- Pagination
- Search Integration
- Custom Cell Rendering

---

### StatusBadge

Supported statuses:

```text
REQUESTED
ISSUED
APPROVED
REJECTED
RETURNED
OVERDUE
ACTIVE
INACTIVE
PAID
UNPAID
STUDENT
LIBRARIAN
ADMINISTRATOR
```

---

### ConfirmDialog

Used across the application for:

```text
Approve Request
Reject Request
Activate Book
Deactivate Book
Return Book
Mark Fine Paid
Delete Records
```

---

## Dashboard Analytics

The dashboard includes:

- KPI Metrics
- Request Statistics
- Book Analytics
- Category Distribution
- Pending Requests Overview
- Overdue Books Overview
- Real-time Data from Backend APIs

---

## Backend Dependency

This frontend application depends on the Education Management System Backend API.

Required backend modules:

```text
Authentication
Books
Requests
Issues
Fines
Users
Reports
```

Ensure the backend server is running before accessing the frontend application.

---

## Recording






https://github.com/user-attachments/assets/84afcb89-933a-491b-8df1-9559ca8e0c7b



---

## Author

**Vishnu Divakar**

Education Management System Frontend developed using:

- React
- Redux Toolkit
- RTK Query
- Chakra UI
- Recharts
- Vite

---

## License

This project is intended for educational and learning purposes.
