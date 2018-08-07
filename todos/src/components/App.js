import React from 'react'
import ConnectedTodos from './Todos'
import ConnectedGoals from './Goals'
import { connect } from 'react-redux'
import {handleInitialData} from "../actions/share";


class App extends React.Component {

    componentDidMount() {
        const {dispatch} = this.props

        dispatch(handleInitialData())
    }

    render() {
        if (this.props.loading === true) {
            return <h1>...loading</h1>
        }

        return(
            <div>
                <ConnectedTodos />
                <ConnectedGoals />
            </div> )
    }
}

// connect function is passed the store, any properties that we return on this object will be passed as props to our App component
export default connect((state) => ({
    loading: state.loading
}))(App)

