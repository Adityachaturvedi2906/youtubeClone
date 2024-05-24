import './App.css';
import Head from './components/Head';
import Body from './components/Body';
import { Provider } from 'react-redux';
import store from './utilities/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and Routes
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <Provider store={store}>
      <Router> {/* Wrap your app with Router */}
        <div className="grid grid-flow-row">
          <Head />
          <Routes> {/* Use Routes to define your routes */}
            <Route path="/" element={<Body/>}> {/* Use Route for the Body component */}
              <Route index element={<MainContainer />} /> {/* Nested Route for MainContainer */}
              <Route path="watch" element={<WatchPage />} /> {/* Nested Route for WatchPage */}
              <Route path="results" element={<SearchResults />} /> {/* Nested Route for SearchResults */}
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
