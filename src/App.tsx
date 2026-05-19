import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FiHome,
  FiLayers,
  FiDollarSign,
  FiShield,
  FiMenu,
} from "react-icons/fi";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ComponentsIndex from "./pages/ComponentsIndex";
import ComponentDetails from "./pages/ComponentDetails";
import PayStream from "./pages/PayStream";

const navigation = [
  { name: "Home", path: "/", icon: FiHome },
  { name: "Dashboard", path: "/dashboard", icon: FiDollarSign },
  { name: "Components", path: "/components", icon: FiLayers },
  { name: "PayStream", path: "/paystream", icon: FiShield },
];

function PageContainer() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/components" element={<ComponentsIndex />} />
        <Route path="/components/:slug" element={<ComponentDetails />} />
        <Route path="/paystream" element={<PayStream />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-slate-900/95 p-5 shadow-md shadow-slate-950/30">
            <div className="flex items-center gap-4">
              <p className="text-base font-semibold uppercase tracking-[0.35em] text-slate-100">
                SuiWealth
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950 text-slate-100 transition hover:border-slate-500 sm:hidden"
              aria-label="Toggle navigation"
            >
              <FiMenu className="h-5 w-5" />
            </button>

            <nav
              className={`w-full transform transition-all duration-200 sm:inline-flex sm:w-auto ${
                menuOpen ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                          isActive
                            ? "bg-cyan-500 text-slate-950"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </div>
            </nav>
          </header>

          <main className="mt-6">
            <PageContainer />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
