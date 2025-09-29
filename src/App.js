import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./pages/Forms/Login"
import { Register } from "./pages/Forms/Register"
import { Home } from "./pages/Home"
import { PrivateRoute } from "./components/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute/>}>
          <Route path="/home" element={<Home/>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
