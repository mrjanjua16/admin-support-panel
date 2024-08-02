import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Signin from './pages/SignIn.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route element={<PrivateRoute />}>
          <Route path='/Dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
