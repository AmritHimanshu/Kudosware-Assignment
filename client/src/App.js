import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import Signup from "./components/Signup";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
