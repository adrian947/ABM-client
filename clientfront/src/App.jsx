import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import RoutesAPP from "./routes/Routes";

function App() {
  return (
    <AuthProvider>
      <RoutesAPP />
    </AuthProvider>
  );
}

export default App;
