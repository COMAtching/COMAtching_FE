import React from "react";
import Mainpage from "./pages/Mainpage";
import Form from "./pages/Form";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/Form" element={<Form />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;