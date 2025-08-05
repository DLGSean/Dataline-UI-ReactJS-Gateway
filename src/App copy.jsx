import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Button from './Button/Button.jsx'
import Tokens from './Tokens.jsx'
function App() {
  return (
    <>
      <Header/>
      <Tokens token="123123"/>
      <Tokens token="44444"/>
      <Tokens/>
      <Button/>
      <Footer/>
    </>
  )
}

export default App
