import { BrowserRouter as Router, Link } from "react-router-dom";

import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <Router>
      <div className="mx-auto p-4">
        <nav className="flex justify-center space-x-4 mb-6">
        <Link to="/" className="text-blue-500 hover:underline">Strona główna</Link>
          <Link to="/products" className="text-blue-500 hover:underline">Produkty</Link>
          <Link to="/recipes" className="text-blue-500 hover:underline">Recepty</Link>
        </nav>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
