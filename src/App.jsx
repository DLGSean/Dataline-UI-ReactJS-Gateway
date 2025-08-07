import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login.jsx';
import Main from './Components/Main.jsx';
import Tokens from './Components/Tokens/MainToken.jsx';
import AddToken from './Components/Tokens/AddToken.jsx';
import UpdateToken from './Components/Tokens/UpdateToken.jsx';
import DeleteToken from './Components/Tokens/DeleteToken.jsx';
import Administrator from './Components/Administrators/MainAdministrator.jsx';
import AddAdministrator from './Components/Administrators/AddAdministrator.jsx';
import UpdateAdministrator from './Components/Administrators/UpdateAdministrator.jsx';
import DeleteAdministrator from './Components/Administrators/DeleteAdministrator.jsx';
import About from './Components/About.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import './Components/Custom.css'; // 👈 Import CSS for custom styles
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/main"
          element={
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/tokens"
          element={
            <PrivateRoute>
              <Tokens />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-token"
          element={
            <PrivateRoute>
              <AddToken />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-token/:tokenId"
          element={
            <PrivateRoute>
              <UpdateToken />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete-token/:tokenId"
          element={
            <PrivateRoute>
              <DeleteToken />
            </PrivateRoute>
          }
        />
        <Route
          path="/administrators"
          element={
            <PrivateRoute>
              <Administrator />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-administrator"
          element={
            <PrivateRoute>
              <AddAdministrator />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-administrator/:administratorId"
          element={
            <PrivateRoute>
              <UpdateAdministrator />
            </PrivateRoute>
          }
        />
        <Route
          path="/delete-administrator/:administratorId"
          element={
            <PrivateRoute>
              <DeleteAdministrator />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
