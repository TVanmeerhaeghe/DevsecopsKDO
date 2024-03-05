import logo from './logo.svg';
import './App.css';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>En premier lieux</h1>
        <Button textcontent={`Salut quoi`} onClick={()=>console.log(`test`)}/>
      </header>
    </div>
  );
}

export default App;
