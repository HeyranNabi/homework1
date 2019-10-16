import React from 'react';
import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      todos:[]
    }
  }

  componentDidMount = async () => {
    const _usersRes = await fetch("https://jsonplaceholder.typicode.com/users/");
    const _users = await _usersRes.json();
    console.log(_users);
    this.setState({users: _users});

    const todosRes =await fetch("http://jsonplaceholder.typicode.com/todos/");
    const todos =await todosRes.json();
    this.setState({todos});
  }

  handleChange = async e => {
    const userId = e.currentTarget.value;
    const usertodosRes = await fetch(`http://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    const userTodos = await usertodosRes.json();
    this.setState({todos: userTodos}, () => console.log("todos -> ", this.state.todos))
  };

  render(){
    const {users, todos} = this.state;
    return (
      <div className="App">
        <select onChange={this.handleChange}>
          {users.map(user => 
            <option value={user.id} key={user.id}>{user.name}</option>
            )}  
            
            <option name="all">all</option>
          </select>  
          {todos.map(todo => 
            <p key={todo.id}>{todo.title}</p>
            )} 
      </div>
    );
  }
}

export default App;
