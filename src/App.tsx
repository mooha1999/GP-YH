import "./App.css";
import BudgetTracking from "./pages/budget-tracking";
import App2 from "./pages/app-2";
import App3 from "./pages/app-3";
import { Route, Link, Routes } from "react-router";
import App4 from "./pages/app-4";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/budget-tracking" className="nav-link">
              Purchase budget estimation
            </Link>
          </li>
          <li>
            <Link to="/app-2" className="nav-link">
              Hospital Evaluation
            </Link>
          </li>
          <li>
            <Link to="/app-3" className="nav-link">
              Outpatient Clinic Reports
            </Link>
          </li>
          <li>
            <Link to="/app-4" className="nav-link">
              ATM simulation
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/budget-tracking" element={<BudgetTracking />} />
        <Route path="/app-2" element={<App2 />} />
        <Route path="/app-3" element={<App3 />} />
        <Route path="/app-4" element={<App4 />} />
      </Routes>
    </div>
  );
}

export default App;
