import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import TruthOrDare from "../pages/TruthOrDare";
import Choice_TruthOrDare from "./pages/Choice_TruthOrDare";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/truthOrDare" element={<TruthOrDare />} />
                <Route path="/choice_truthOrDare" element={<Choice_TruthOrDare />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;