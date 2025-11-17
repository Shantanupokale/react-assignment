import { Routes, Route, NavLink, useLocation } from "react-router-dom"
import CoursesPage from "./pages/CoursesPage.jsx"
import AdminPage from "./pages/AdminPage.jsx"

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark ">
      {/* Top bar */}
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <h1 className="text-base font-semibold tracking-tight">
            Course Explorer
          </h1>

          <div className="flex gap-2 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-md px-3 py-1 outline-none transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
              aria-label="Courses tab"
            >
              Courses
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `rounded-md px-3 py-1 outline-none transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
              aria-label="Admin tab"
            >
              Admin
            </NavLink>
          </div>
        </nav>
      </header>

      <Routes location={location}>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  )
}

export default App
