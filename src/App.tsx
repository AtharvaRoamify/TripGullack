import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./MainPages/Navigation";
import { LandingPage } from "./MainPages/LandingPage";
import { LoginPage } from "../src/Auth/Pages/LoginPage";
import { SignupPage } from "../src/Auth/Pages/SignupPage";
import { ExplorePage } from "./MainPages/ExplorePage";
import { ItineraryCreatorPage } from "../src/modules/itinerary/Pages/ItineraryCreatorPage";
import { AuthProvider, useAuth } from "./Auth/Store/AuthHook";
import { ItineraryProvider } from "./modules/itinerary/Pages/dummyItineraryData"; // Fixed import path
import { ItineraryContainer } from "./modules/itinerary/Pages/iteneraryContainer"
// Inner component that uses the auth context
function AppContent() {
  const { loading } = useAuth();

  // Don't render navigation until auth is loaded
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/create" element={<ItineraryContainer  />} />
        <Route path="/create/add" element={<ItineraryCreatorPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ItineraryProvider>
        <Router>
          <AppContent />
        </Router>
      </ItineraryProvider>
    </AuthProvider>
  );
}

export default App;