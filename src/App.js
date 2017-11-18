import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import SearchBar from "./SearchBar.js";
import star from './images/star.svg';
import wars from './images/wars.svg';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends Component {
  constructor(props) {
    super(props);
    this.allTheCards = this.allTheCards.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      people: [],
      pageCount: 8,
      searchQuery: "",
      planets: []
    };
  }

  componentWillMount() {
    this.allTheCards("_page=1");
    const data = {
      homeworld: 1
    };

  }

  // API call to get the cards from 'http://localhost:3008/people'
  allTheCards(query) {
    axios.get("http://localhost:3008/planets").then(successPlanet => {
      axios.get(`http://localhost:3008/people?${query}`).then(successPerson => {
        this.setState({
          people: successPerson.data,
          pageCount: Math.ceil(parseInt(successPerson.headers["x-total-count"] / 10)),
          planets: successPlanet.data
        });
      });
    });
  }

  handlePageClick() {
    return (data) => {
      // add one because page starts at 1 on the backend but pagination starts with 0 (but displayed as 1 on the front end as well)
      const searched = this.state.searchQuery ? `q=${this.state.searchQuery}&` : "";
      this.allTheCards(`${searched}_page=${data.selected + 1}`);
    };
  }

  // 'this' represents this App class and query is the input dom
  handleSearch(query) {
    const actualString = query.target.value;
    this.setState({ searchQuery: actualString });
    // Make an ajax call to the backend with this string
    this.allTheCards(`q=${actualString}&_page=1`);
  }

  render() {
    return (
      <div className='content'>
        <div className='logo'>
          <img src={star} alt="star-logo" />
          <span className='interview-text'>The Interview</span>
          <img src={wars} alt="wars-logo" />
        </div>
        <SearchBar value={this.state.searchQuery} search={this.handleSearch} />
        {this.state.people.map((people, i) => <Card key={i} person={people} planets={this.state.planets} />)}
        <ReactPaginate
          initialPage={0}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick()}
          activeClassName={"active"} />
      </div>
    );
  }
}

export default App;
