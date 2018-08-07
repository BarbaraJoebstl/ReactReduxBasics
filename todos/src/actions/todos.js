import API from 'goals-todos-api'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'

//action creator functions
function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodo(id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

// async action creators
export function handleAddTodo(name, cb) {
    return (dispatch) => {
        // we don t do optimistic updates here, because the id is generate on the server
        return API.saveTodo(name)
            .then((todo) => {
                dispatch(addTodo(todo))
                cb()
            })
            .catch(() => {
                alert('An error occured.')
            })
    }
}


export function handleToggle(id) {
    return (dispatch) => {
        dispatch(toggleTodo(id))

        return API.saveTodoToggle(id)
            .catch(() => {
                dispatch(toggleTodo(id))
                alert('An error occured')
            })
    }
}

export function handleDeleteTodo(todo) {
    return (dispatch) => {

        //optimistic update
        dispatch(removeTodo(todo.id))

        return API.deleteTodo(todo.id)
            .catch(() => {
                dispatch(addTodo(todo))
                alert('An error occured')
            })
    }
}
