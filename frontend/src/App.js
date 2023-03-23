import './App.css';
import {Header} from './components/index'
import {NotesList, NotePage} from './pages/index'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className='container dark'>
          <div className="app">
          <Header />  
          <Routes>
            <Route path="/" exact element={<NotesList />} />
            <Route path="note/:id" element={<NotePage />} />
          </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
