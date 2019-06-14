import React, {Component} from 'react';
import './App.css';

class App extends Component{
  render(){
    return(
      
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <p>test</p>
              <p>pest</p>
            </div>
          </nav>
        </div>
      
    )
  }
}


export default App;
