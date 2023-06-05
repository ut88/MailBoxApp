import './App.css';
import Form1 from './components/Form';
import Welcome from './components/Welcome';
import {useSelector} from "react-redux";
function App() {
  const login=useSelector(state=>state.login.status)
  return (
    <div>
      {!login && <Form1 />}
      {login &&  <Welcome /> }
    </div>
  );
}

export default App;
