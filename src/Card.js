import React, { Component } from 'react';
import './Card.css';
import axios from 'axios';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: 0,
      name: "",
      birth_year: "",
      favorite: 0
    };
    this.enableEdit = this.enableEdit.bind(this);
    this.editOrRender = this.editOrRender.bind(this);
    this.save = this.save.bind(this);
    this.allPlanetOptions = this.allPlanetOptions.bind(this);
  }

  enableEdit() {
    this.setState({ edit: 1 });
  }

  componentWillMount() {
    const { person } = this.props;
    this.setState({ name: person.name, birth_year: person.birth_year, homeworld: person.homeworld });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.person.name, birth_year: nextProps.person.birth_year,
      homeworld: nextProps.person.homeworld, edit: 0
    });
  }

  editInputs() {
    return (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
  }

  save() {
    const data = {
      name: this.state.name,
      birth_year: this.state.birth_year,
      homeworld: this.state.homeworld
    };
    axios.patch(`http://localhost:3008/people/${this.props.person.id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    }).then(success => {
      this.setState({ edit: 0, name: this.state.name, birth_year: this.state.birth_year });
    });
  }

  allPlanetOptions() {
    return this.props.planets.map((planet, index) => {
      return <option key={index} value={index + 1}>{planet.name}</option>;
    });
  }

  editOrRender(section) {
    if (section === 'name')
      return this.state.edit ?
        <input value={this.state.name} name="name" onChange={this.editInputs()} /> :
        <div>{this.state.name}</div>;
    else if (section === 'birthday')
      return this.state.edit ?
        <input value={this.state.birth_year} name="birth_year" onChange={this.editInputs()} /> :
        <span>{this.state.birth_year}</span>;
    else if (section === 'homeworld')
      return this.state.edit ?
        <select value={this.state.homeworld} name="homeworld" onChange={this.editInputs()}>{this.allPlanetOptions()}</select> :
        <span>{this.props.planets[this.state.homeworld - 1].name}</span>;


    // need to do minus one because successplanet is an array and array index starts at 0 while the id's start at 1
    else
      return this.state.edit ?
        <div className="pointer" onClick={this.save}>Save</div> :
        <div className="pointer" onClick={this.enableEdit}>Edit</div>;

  }

  favorite() {
    return (e) => {
      if (this.state.favorite) {
        this.setState({ favorite: 0 });
        e.target.style.backgroundColor = 'blue';
      } else {
        this.setState({ favorite: 1 });
        e.target.style.backgroundColor = 'red';
      }
    };
    
  }

  render() {
    const { person } = this.props;
    return (
      <div className='card'>
        <div className='card-content'>
          <div className='card-name'>
            {this.editOrRender('name')}
            {this.editOrRender('edit')}
          </div>
          <img src={`http://localhost:3008/${person.image}`} alt='profile' />
          <p>
            <span>Birthday:</span>
            {this.editOrRender('birthday')}
          </p>
          <p>
            {/* Note that in order to get the homeworld's name, you have to get the planet name from a different endpoint than the people */}
            <span>Homeworld:</span>
            {this.editOrRender('homeworld')}
          </p>
          <p className="center">
            <div onClick={this.favorite()} className="favorite pointer">{this.state.favorite ? "Unfavorite" : "Favorite"}</div>
          </p>
        </div>
      </div>

    );
  }
}

export default Card;
