import React from 'react';
import './App.css';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The main app component.
 * 
 * This component is the root of the React component tree and is rendered by
 * the `ReactDOM.render` method in `index.tsx`.
 * 
 * The component renders a `div` with the class "App" which contains a

 * `header` with the class "App-header" and a `div` with the class "App-body".
 * 
 * The `App-header` contains an image with the class "App-logo" which is the
 * WPI Cue Sports Club logo, a paragraph with text that tells the user to edit
 * the file `src/App.tsx` and save to reload, and a link with the class
 * "App-link" which links to the React homepage.
 * 
 * The `App-body` contains any additional components that are rendered by the
 * app.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
