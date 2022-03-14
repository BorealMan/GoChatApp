import './App.css';
import Login from './components/login/login';
import { useSelector } from "react-redux"
import Chat from './components/chat/chat';

function App() {

  const user = useSelector((state:any) => state.user)

  if (!user.loggedIn) {
    return (
      <div className="App">
        <Login />
      </div>
    );
  } else {
    if (user.user.role === 'admin'){
      console.log("Welcome Admin.")
      return (
        <div className='App'>
          <Chat />
        </div>
      )
    } else {
      return (
        <div className='App' >
          <Chat />
        </div>
      )
    }
  }


}

export default App;
