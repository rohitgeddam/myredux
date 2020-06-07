function createStore(reducer){
    // 1.   state tree
    // 2.   get the state
    // 3.   know when the state changes.
    // 4.   update the state.

    let state;
    let listners = [];

    const getState = () => state;
    const subscribe = (func) => {
        listners.push(func)
        // should return unsubscribe functgion.
        return () => {listners = listners.filter(l => l !== func)}
    }

    const dispatch = (action) =>  {
        state = reducer(state,action);
        // as soon as state changes run all functions in the listners
        listners.forEach(l => l())
    }

    return {
        getState,
        subscribe,
        dispatch,
    }

}

function todoReducer(state = [],action){
    switch(action.type){
        case 'ADD_TODO':
            return state.concat([action.todo])
        case 'DELETE_TODO':
            return state.filter((todo)=> todo.id !== action.id)
        default:
            return state
    }
}

// actionCreator
function addTodoAction(todo){
    return {
        type: 'ADD_TODO',
        todo,
    }
}

function deleteTodoAction(id){
    return{
        type:'DELETE_TODO',
        id,
    }
}


const store = createStore(todoReducer);

store.subscribe(()=> {
    console.log("store has updated: ", store.getState())
})

store.dispatch(addTodoAction({
    id:0,
    task:'Walk',
    isDone:false
}))


store.dispatch(addTodoAction(
    {
        id:1,
        task:'Walk the dog',
        isDone:false
    }
))



store.dispatch(deleteTodoAction(0))