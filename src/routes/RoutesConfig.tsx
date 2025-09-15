import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";

import { Users } from "../pages/Users"
import { RegisterUser } from "../pages/RegisterUser";
import { EditUser } from "../pages/EditUser";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users/>} />
      <Route path="/users/create" element={<RegisterUser/>} />
      <Route path="/edit-user/:id" element={<EditUser/>} />
    </Routes>
  );
} 