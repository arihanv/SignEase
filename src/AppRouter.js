import React from "react";
import { Routes, Route } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Quiz from "./Quiz";
import App from "./App";


const history = createBrowserHistory();

function AppRouter() {

  return (
    <Router history={history}>
        <Routes>
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/" element={<App />} />
        </Routes>
    </Router>
  );
}

export default AppRouter;
