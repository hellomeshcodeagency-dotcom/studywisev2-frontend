import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import LandingPage       from './pages/LandingPage.jsx'
import LoginPage         from './pages/LoginPage.jsx'
import RegisterPage      from './pages/RegisterPage.jsx'
import DashboardPage     from './pages/DashboardPage.jsx'
import CoursesPage       from './pages/CoursesPage.jsx'
import CourseDetailPage  from './pages/CourseDetailPage.jsx'
import TutorPage         from './pages/TutorPage.jsx'
import PastQuestionsPage from './pages/PastQuestionsPage.jsx'
import UploadPage        from './pages/UploadPage.jsx'
import GpaPage           from './pages/GpaPage.jsx'
import ProfilePage       from './pages/ProfilePage.jsx'
import AdminPage         from './pages/AdminPage.jsx'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:'#020817' }}>
      <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"/>
    </div>
  )
  return user ? children : <Navigate to="/login" replace/>
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace/>
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace/>
  return children
}

function PublicRoute({ children }) {
  const { user } = useAuth()
  return user ? <Navigate to="/dashboard" replace/> : children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ duration: 3500, style: { background:'#1E293B', color:'#F1F5F9', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'12px' } }}/>
        <Routes>
          <Route path="/"         element={<LandingPage/>}/>
          <Route path="/login"    element={<PublicRoute><LoginPage/></PublicRoute>}/>
          <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>}/>
          <Route path="/dashboard"      element={<PrivateRoute><DashboardPage/></PrivateRoute>}/>
          <Route path="/courses"        element={<PrivateRoute><CoursesPage/></PrivateRoute>}/>
          <Route path="/courses/:id"    element={<PrivateRoute><CourseDetailPage/></PrivateRoute>}/>
          <Route path="/tutor"          element={<PrivateRoute><TutorPage/></PrivateRoute>}/>
          <Route path="/past-questions" element={<PrivateRoute><PastQuestionsPage/></PrivateRoute>}/>
          <Route path="/upload"         element={<PrivateRoute><UploadPage/></PrivateRoute>}/>
          <Route path="/gpa"            element={<PrivateRoute><GpaPage/></PrivateRoute>}/>
          <Route path="/profile"        element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
          <Route path="/admin"          element={<AdminRoute><AdminPage/></AdminRoute>}/>
          <Route path="*"               element={<Navigate to="/" replace/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
