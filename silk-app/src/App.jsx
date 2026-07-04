import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PublicLayout from './components/layout/PublicLayout'
import AppShell from './components/layout/AppShell'
import RequireAuth from './components/routes/RequireAuth'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import TeamPage from './pages/TeamPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import PricingPage from './pages/PricingPage'
import CreateTaskPage from './pages/CreateTaskPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ProductDemoPage from './pages/ProductDemoPage'
import SolutionsPage from './pages/SolutionsPage'
import ProfilePage from './pages/ProfilePage'
import TaskDetailPage from './pages/TaskDetailPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <AppShell><DashboardPage /></AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/tasks"
            element={
              <RequireAuth>
                <AppShell><TasksPage /></AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/team"
            element={
              <RequireAuth>
                <AppShell><TeamPage /></AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/analytics"
            element={
              <RequireAuth>
                <AppShell><AnalyticsPage /></AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <AppShell><SettingsPage /></AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <AppShell><ProfilePage /></AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/pricing"
            element={
              <RequireAuth>
                <AppShell><PricingPage /></AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <RequireAuth>
                <AppShell><TaskDetailPage /></AppShell>
              </RequireAuth>
            }
          />
          <Route
            path="/create-task"
            element={
              <RequireAuth>
                <AppShell><CreateTaskPage /></AppShell>
              </RequireAuth>
            }
          />
          <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
          <Route path="/product-demo" element={<PublicLayout><ProductDemoPage /></PublicLayout>} />
          <Route path="/solutions" element={<PublicLayout><SolutionsPage /></PublicLayout>} />
          <Route path="/forgot-password" element={<PublicLayout><ForgotPasswordPage /></PublicLayout>} />
          <Route path="/reset-password" element={<PublicLayout><ResetPasswordPage /></PublicLayout>} />
          <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
