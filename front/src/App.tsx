import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './pages/main';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Article from './pages/article';
import NewArticle from './pages/newArticle';
import EditArticle from './pages/editArticle/EditArticle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main isAdmin={false}/>}/>
        <Route path="/article/:id" element={<Article/>}/>
        <Route path="/newArticle" element={<NewArticle/>}/>
        <Route path="editArticle/:id" element={<EditArticle/>}/>
        <Route path="/admin" element={<Main isAdmin={true}/>}/>
      </Routes>
    </Router>
    // <Main/>

  );
}

export default App;
