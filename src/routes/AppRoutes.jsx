import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import StudentDashboard from "../pages/student/StudentDashboard";
import BookCatalog from "../pages/student/BookCatalog";
import MyBooks from "../pages/student/MyBooks";

import LibrarianDashboard from "../pages/librarian/LibrarianDashboard";
import BookManagement from "../pages/librarian/BookManagement";
import RequestManagement from "../pages/librarian/RequestManagement";
import IssueManagement from "../pages/librarian/IssueManagement";
import AuthPage from "../pages/auth/AuthPage";

export default function AppRoutes() {
  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!token) {
      return <Navigate to="/" replace />;
    }

    if (allowedRole && role !== allowedRole) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />

        <Route path="/student/books" element={<BookCatalog />} />

        <Route path="/student/my-books" element={<MyBooks />} />

        <Route path="/admin/dashboard" element={<LibrarianDashboard />} />

        <Route path="/admin/books" element={<BookManagement />} />

        <Route path="/admin/requests" element={<RequestManagement />} />

        <Route path="/admin/issue" element={<IssueManagement />} />

      </Routes>
    </BrowserRouter>
  );
}
