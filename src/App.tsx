import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UsersPage from "./pages/UserPage";
import ProductsPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-500 p-4 text-white sticky top-0 z-10">
          <ul className="flex space-x-4">
            <li>
              <Link to="/users" className="hover:text-blue-200">
                Users
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-200">
                Products
              </Link>
            </li>
          </ul>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/" element={<UsersPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
