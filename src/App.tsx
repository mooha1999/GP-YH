import "./App.css";
import BudgetTracking from "./pages/budget-tracking";
import App2 from "./pages/app-2";
import { Route, Link, Routes } from "react-router";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/budget-tracking" className="nav-link">
              Budget Tracking
            </Link>
          </li>
          <li>
            <Link to="/app-2" className="nav-link">
              App 2
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/budget-tracking" element={<BudgetTracking />} />
        <Route path="/app-2" element={<App2 />} />
      </Routes>
    </div>
  );
}

export default App;
