import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './containers/Admin/login';

import Home from './components/Home';
import Book from './components/Book';
import Layout from './hoc/Layout';
import Auth from './hoc/auth';
import User from './components/Admin/index';
import AddBook from './containers/Admin/add';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/user" exact component={Auth(User, true)} />
        <Route path="/user/add" exact component={Auth(AddBook, true)} />
        <Route path="/books/:id" exact component={Auth(Book)} />
      </Switch>
    </Layout>
  )
};


export default Routes;
