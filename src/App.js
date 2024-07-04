import { GlobeView } from "views";
import { Routes, Route, HashRouter } from "react-router-dom"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<GlobeView />}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
