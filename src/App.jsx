import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Body from './Body.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login.jsx'
import Main from './Components/Main.jsx';
import Tokens from './Components/Tokens.jsx';
function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
         <Route path="/tokens" element={<Tokens />} />
      </Routes>
    </Router>
  );
  // return (
  //   <>
  //   <Login></Login>
  //     {/* <Header/>
  //     <Body/>
  //     <Footer/> */}
  //   </>
  // )
}

export default App
