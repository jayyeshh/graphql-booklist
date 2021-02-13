import React from 'react';
import BookList from './components/bookList';
import Form from './components/form';

class App extends React.Component{
  render(){
    return (
        <div id="main">
          <h1>Book List </h1>
          <BookList/>
          <Form/>
        </div>
    );
  }
}

export default App;