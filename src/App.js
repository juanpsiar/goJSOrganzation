import logo from './logo.svg';
import './App.css';
import GoJS from './GoJS';
import CatDiagram from './CatDiagram';

function App() {
  return (
    <div className="App">
      {/* <header className="">{ExampleTree()}</header> */}
      <GoJS />
      <CatDiagram />
    </div>
  );
}

export default App;
