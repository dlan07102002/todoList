import logo from './logo.svg';
import './App.css';
import Content from './Todo/index.js'
import {useState} from 'react'
function App() {
  const [show, setShow] = useState(false);
  return (
    <div style = {{padding: "32px"}}>
      <Content />
    </div>
  );
}

export default App;
