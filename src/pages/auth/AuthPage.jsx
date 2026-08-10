import { useState } from "react";

import AuthLayout from "../../components/layout/AuthLayout";

import LoginForm from "../../components/auth/LoginForm";
import StudentRegisterForm from "../../components/auth/StudentRegisterForm";
import AdminRegisterForm from "../../components/auth/AdminRegisterForm";

export default function AuthPage() {
  const [mode, setMode] = useState("LOGIN");

  const [registerType, setRegisterType] = useState("STUDENT");

  return (
    <AuthLayout
      mode={mode}

      setMode={setMode}

      registerType={registerType}

      setRegisterType={setRegisterType}
    >
      {mode === "LOGIN" && <LoginForm setMode={setMode} />}

      {mode === "REGISTER" && registerType === "STUDENT" && (
        <StudentRegisterForm setMode={setMode} />
      )}

      {mode === "REGISTER" && registerType === "ADMIN" && (
        <AdminRegisterForm setMode={setMode} />
      )}
    </AuthLayout>
  );
}
