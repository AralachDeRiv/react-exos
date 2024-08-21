import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import EmojiSearch from "./pages/EmojiSearch";
import SopWatch from "./pages/SopWatch";
import MarkdownReader from "./pages/MarkdownReader";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/todoList" element={<TodoList />}></Route>
        <Route path="/emojiSearch" element={<EmojiSearch />}></Route>
        <Route path="/stopWatch" element={<SopWatch />}></Route>
        <Route path="/markdownReader" element={<MarkdownReader />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
