import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UsersPage from "./pages/UserPage";
import ProductsPage from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-">
        <nav className="bg-custom-blue p-4 text-custom-black sticky top-0 z-10">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/users"
                className="hover:text-white hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-white hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              >
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
