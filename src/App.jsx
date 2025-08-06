import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login.jsx'
import Main from './Components/Main.jsx';
import Tokens from './Components/Tokens/MainTokens.jsx';
import AddToken from './Components/Tokens/AddToken.jsx';
import UpdateToken from './Components/Tokens/UpdateToken.jsx';
import DeleteToken from './Components/Tokens/DeleteToken.jsx';
function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
         <Route path="/tokens" element={<Tokens />} />
         <Route path="/add-token" element={<AddToken />} />
         <Route path="/update-token/:tokenId" element={<UpdateToken />} />
         <Route path="/delete-token/:tokenId" element={<DeleteToken />} />
      </Routes>
    </Router>
  );
}

export default App
