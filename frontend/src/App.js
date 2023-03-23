import './App.css';
import {Header} from './components/index'
import {NotesList, NotePage} from './pages/index'
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div className='container dark'>
          <div className="app">
          <Header />  
          <Routes>
            <Route path="/" exact element={<NotesList />} />
            <Route path="note/:id" element={<NotePage />} />
          </Routes>
          </div>
      </div>
    </HashRouter>
  );
}

export default App;
