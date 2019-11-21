import React, { Component } from 'react'
import {Route,Redirect,Switch,NavLink} from 'react-router-dom'
import Mybook from './Mybook'
import Choice from './Choice'
import Ranking from './Ranking'
import classify from './Classify'
import Detail from './Detail'
export default class Index extends Component {
    state={
        navList:[
            {
                tit:'书包',
                path:'/index/mybook'
            }, {
                tit:'精选',
                path:'/index/choice'
            },{
                tit:'排行',
                path:'/index/ranking'
            },{
                tit:'分类',
                path:'/index/classify'
            },
        ]
    }
    render() {
        return (
            <div className='m-index'>
             <nav className='m-index-nav'>
              {
                  this.state.navList.map((item,index)=>(
                    <NavLink className='m-index-nav-item' activeClassName='active' key={index} to={item.path}>{item.tit}</NavLink>
                  ))
              }
             </nav>
             <div className="m-index-content">
             <Switch>
                 <Redirect from='/index' to='/index/choice' exact></Redirect>
                 <Route path='/index/mybook' component={Mybook}></Route>
                 <Route path='/index/choice' component={Choice}></Route>
                 <Route path='/index/ranking' component={Ranking}></Route>
                 <Route path='/index/classify' component={classify}></Route>
                 <Route path='/index/detail/:id' component={Detail}></Route>
             </Switch>
             </div>
            </div>
        )
    }
}
