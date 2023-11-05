import Home from "./pages/Home"
import About from './pages/About'
import Counter from './pages/Counter'
import LogIn from "./pages/LogIn"
import Options from "./workout/Options"
import {Routes, Route, Link} from 'react-router-dom';
import "./App.css";
import SignUp from "./pages/SignUp"

function App() {
  return (
    <div className="App">
      <nav>
        <Link to='/'>Home</Link> | <Link to="/about">About</Link> | <Link to="/counter">Counter</Link> 
         | <Link to="/login">LogIn </Link> | <Link to="/signup">SignUp </Link>

      </nav>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/counter' element={<Counter/>} />
        <Route path='/workout' element={<Options/>} />
      </Routes>
    </div>
  );
}

export default App;
 