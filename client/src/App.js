import { Landing, Detail, Home, Form } from './views'
import Page404 from './views/Page404/Page404'
import { Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/videogames/:id" element={<Detail />} />
          <Route exact path="/create" element={<Form />} />
          <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </div>
  );
}

export default App;