import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import BlogInput from './BlogInput';
import BlogFull from './BlogFull';

class Navigation extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <NavBar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path ="/blog/input" component={BlogInput} />
                        <Route path ="/blogs/:id" component={BlogFull} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default Navigation;