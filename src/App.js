import {
  BrowserRouter as Router, 
} from 'react-router-dom'
import RouterURL from './routes/RouterURL';

function App() {
  return (
    <Router>
        <div className="App">
            <RouterURL></RouterURL>
        </div>
    </Router>
  );
}

export default App;
