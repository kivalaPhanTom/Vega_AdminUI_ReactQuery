import React, {useEffect}from 'react'
import {
  BrowserRouter as Router, 
} from 'react-router-dom'
import RouterURL from './routes/RouterURL';
import { socket, SocketContext } from './SocketConfig/socket';
import { MethodCommon } from "./Common/methods";

function App() {
  // useEffect(()=>{
  //   MethodCommon.renderFileLangVnFile()
  // },[])
  return (
    <SocketContext.Provider  value={socket}>
      <Router>
          <div className="App">
              <RouterURL></RouterURL>
          </div>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
