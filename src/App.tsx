import "./App.css";
import Form from "./components/form";
// import './imgs/edit.svg'

function App() {
  return (
    <>
      <header className="my-5 text-center">
        <h1 className="display-2 text-success">Todo List</h1>
      </header>
      <main className="container">
        <Form />
      </main>
    </>
  );
}

export default App;
