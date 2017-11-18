import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js";
import star from './images/star.svg';
import wars from './images/wars.svg';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.allTheCards = this.allTheCards.bind(this);
    this.state = {
      people: []
    };
  }

  componentWillMount() {
    this.allTheCards();
  }

  // API call to get the cards from 'http://localhost:3008/people'
  allTheCards() {
    axios.get("http://localhost:3008/people").then(successPerson => {
      axios.get("http://localhost:3008/planets").then(successPlanet => {
        // After getting planet data and people data then map the people's home planet 
        // with the proper name of the planet
        successPerson.data.forEach(person => {
          // need to do minus one because successplanet is an array and array index starts at 0 while the id's start at 1
          person.homeworld = successPlanet.data[person.homeworld - 1].name;
        });
        this.setState({ people: successPerson.data });
      });
    });
  }

  render() {
    return (
      <div className='content'>
        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='interview-text'>The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>
        <SearchBar />
        {this.state.people.map((people, i) => <Card key={i} person={people} />)}
      </div>
    );
  }
}

export default App;
