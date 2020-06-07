//library code
function createStore(reducer){
    // The store should have four parts
    // 1. The State
    // 2. Get the State.
    // 3. Listen to changes
    // 4. update the state


    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listner) => {
        listeners.push(listner)
        return () => {
            listeners = listeners.filter((l) => l !== listner)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener() )
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

// library code ends






// this is app code

function addTodoAction (todo) {
    return {
        type: 'ADD_TODO',
        todo,
    }
}

function removeTodoAction (id) {
    return {
        type: 'REMOVE_TODO',
        id,
    }
}


function toggleTodoAction (id) {
    return {
        type:  'TOGGLE_TODO',
        id,
    }
}

function addGoalAction (goal) {
    return {
        type: 'ADD_GOAL',
        goal,
    }
}

function removeGoalAction (id) {
    return {
        type: 'REMOVE_GOAL',
        id
    }
}

// reducer
// reducer must be a pure function
function todos (state = [], action) {
    switch(action.type){
        case 'ADD_TODO' :
            return state.concat([action.todo])

        case 'REMOVE_TODO':

            return state.filter((todo)=>todo.id !== action.id)

        case 'TOGGLE_TODO':
            // we cant change the parameters directly in a pure function.
            return state.map((todo)=> todo.id !== action.id ? todo:
                Object.assign({},todo,{complete: !todo.complete})
            )
        default:
            return state


    }


}

//another reducer
function goals (state = [], action){
    switch(action.type){
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
            return state.filter((goal) => goal.id !== action.id)
        default:
            return state;
    }
}


// when we have multiple reducers theres a problem as createStore can only take 1 reducer
// so we create a root reducer
// this is a root reducer.
function app(state={}, action){
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals,action),
    }
}

// reducer ends
// app code ends



const store = createStore(app)

store.subscribe(()=>{
    console.log('The new state is ', store.getState());
})

store.dispatch(addTodoAction({
    id: 0,
    name: 'Walk the dog',
    complete: 'false'
}))

store.dispatch(addTodoAction({
    id: 1,
    name: 'Walk the cat',
    complete: 'false'
}))