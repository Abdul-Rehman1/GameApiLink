import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';

import GameLister from './components/Gamelinker.js';



import history from './History';

// export const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={GameLister} />
                  
                </div>
            </Router>
        )
    }
}


export default Routers;