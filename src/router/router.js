import React, { Component } from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import Index from '../views/Index'
export default class router extends Component {
    render() {
        return (
            <div className='m-route'>
              <Switch>
                  <Redirect from='/' to='/index' exact></Redirect>
                  <Route path='/index' component={Index}></Route>
              </Switch>
            </div>
        )
    }
}
