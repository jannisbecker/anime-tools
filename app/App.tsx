import { Outlet } from "remix";
import Navbar from "./components/shared/Navbar";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col h-screen bg-bgPrimary">
        <Navbar />

        <Outlet />
      </div>
    </AuthProvider>
  );
}
