import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Members from './members/Members'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import CreateMember from './createMember/CreateMember'
import {GlobalState} from '../../GlobalState'

//all routes



//link frontend routes
function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>

            <Route path="/" exact component={Login} />


            <Route path="/member" exact component={Members} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/create_member" exact component={isAdmin ? CreateMember : NotFound} />
            <Route path="/edit_member/:id" exact component={isAdmin ? CreateMember : NotFound} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
