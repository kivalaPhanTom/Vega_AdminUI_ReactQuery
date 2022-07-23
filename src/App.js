import {
  BrowserRouter as Router, 
} from 'react-router-dom'
import RouterURL from './routes/RouterURL';
// import { socket, SocketContext } from './context/socket';
import { socket, SocketContext } from './SocketConfig/socket';

function App() {
  return (
    // <SocketContext.Provider  value={socket}>
      <Router>
          <div className="App">
              <RouterURL></RouterURL>
          </div>
      </Router>
    // </SocketContext.Provider>
  );
}

export default App;
