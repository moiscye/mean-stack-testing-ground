import React, { Component } from "react";
import { Menu, Image } from "semantic-ui-react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { Talents } from "./Talents";
import Todo from "./Todo";
import { TodoFunctional } from "./TodoFunctional";
import Home from "./Home";
import NotFound from "./NotFound";
import Utils from "./Utils";
export default class Navigation extends Component {
  render() {
    return (
      <BrowserRouter>
        <Menu fixed="top" inverted>
          <Menu.Item>
            <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
          </Menu.Item>
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/Talents">
            Talents
          </Menu.Item>
          <Menu.Item as={Link} to="/Utils">
            Bill Splitter
          </Menu.Item>
          <Menu.Item as={Link} to="/TodoFunctional">
            TodoFunctional
          </Menu.Item>
          <Menu.Item as={Link} to="/Todo">
            Todo
          </Menu.Item>
        </Menu>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Talents" component={Talents} />
          <Route path="/Utils" component={Utils} />
          <Route path="/Todo" component={Todo} />
          <Route path="/TodoFunctional" component={TodoFunctional} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
