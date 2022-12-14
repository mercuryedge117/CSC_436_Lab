function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return {
          username: action.username,
          access_token: action.access_token,
        };
      case "LOGOUT":
        return null;
      default:
        return state;
    }
}


function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const newTodo = {
          title: action.title,
          content: action.content,
          author: action.author,
          dateCreated: action.dateCreated, 
          complete: false,
          _id: action.id,
        };
        return [newTodo, ...state];
      case "TOGGLE_TODO":
        const index = state.findIndex(item => item._id === action.id);
        const currTodo = state[index];
        const ceil = state.slice(0, index);
        const floor = state.slice(index+1, index+state.length);
        const updateTodo = {
          title: currTodo.title,
          content: currTodo.content,
          author: currTodo.author,
          dateCreated: currTodo.dateCreated, 
          complete: action.checked,
          dateCompleted: action.dateComp,
          _id: currTodo._id,
        }
        return [...ceil, updateTodo, ...floor];
      case "DELETE_TODO":
        return state.filter(item => item._id !== action.id);
      case "FETCH_TODOS":
        return action.todos;
      case "CLEAR_TODOS":
        return [];
      default:
        return state;      
    }
}

export default function appReducer(state, action) {
    return {
      user: userReducer(state.user, action),
      todos: todoReducer(state.todos, action),
    };
  }