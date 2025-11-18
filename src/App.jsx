import { Routes, Route, NavLink, useLocation } from "react-router-dom"
import CoursesPage from "./pages/CoursesPage.jsx"
import AdminPage from "./pages/AdminPage.jsx"

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#0F0F11] text-gray-200 font-inter">
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          
          <h1 className="text-lg font-semibold tracking-tight bg-primary text-transparent bg-clip-text">
            Course Explorer
          </h1>

          <div className="flex gap-3 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `
                relative rounded-md px-4 py-1.5 transition-all duration-200
                ${
                  isActive
                    ? "text-black bg-primary shadow-md"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }
                `
              }
              aria-label="Courses tab"
            >
              Courses
            </NavLink>

            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `
                relative rounded-md px-4 py-1.5 transition-all duration-200
                ${
                  isActive
                    ? "text-black bg-white shadow-md"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }
                `
              }
              aria-label="Admin tab"
            >
              Admin
            </NavLink>
          </div>

        </nav>
      </header>

      {/* ROUTES */}
      <div className="mx-auto w-full ">
        <Routes location={location}>
          <Route path="/" element={<CoursesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
