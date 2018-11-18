import React, { Component } from "react";
import "./App.scss";
import CardList from "../components/CardList/CardList";
import SearchBox from "../components/SearchBox/SearchBox";
import Scroll from "../components/Scroll/Scroll";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ""
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="container App">
        <div className="header">
          <h1>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
        </div>
        <div className="main">
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
        <div className="footer">&copy; Created by Coolzyte</div>
      </div>
    );
  }
}

export default App;