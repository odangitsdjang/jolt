import React, { Component } from 'react';
import './Card.css';
import axios from 'axios';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: 0,
      name: "",
      birth_year: ""
    };
    this.enableEdit = this.enableEdit.bind(this);
    this.editOrRender = this.editOrRender.bind(this);
    this.save = this.save.bind(this);
  }

  enableEdit() {
    this.setState({ edit: 1 });
  }

  componentWillMount() {
    this.setState({ name: this.props.person.name, birth_year: this.props.person.birth_year });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.person.name, birth_year: nextProps.person.birth_year, edit: 0 });
  }

  editInputs() {
    return (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
  }

  save() {
    const data = {
      name: this.state.name,
      birth_year: this.state.birth_year
    };
    axios.patch(`http://localhost:3008/people/${this.props.person.id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    }).then(success => {
      this.setState({ edit: 0, name: this.state.name, birth_year: this.state.birth_year });
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
    else
      return this.state.edit ?
        <div className="cursor" onClick={this.save}>Save</div> :
        <div className="cursor" onClick={this.enableEdit}>Edit</div>;

  }

  render() {
    const { person } = this.props;
    return (
      <div className='card'>
        <div className='card-content'>
          <form >
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
              <span>{person.homeworld}</span>
            </p>
          </form>
        </div>
      </div>

    );
  }
}

export default Card;
