import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { validator } from '../util/validator';
import { generator } from '../util/generator';

class CreatePool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      toAddOption: '',
      options: [],
      redirect: false
    }
  }

  renderRedirect() {
    if (this.state.redirect) return <Redirect to='/' />;
  }

  handlePoolNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleOptionChange = (e) => {
    this.setState({ toAddOption: e.target.value });
  }

  addOption = (e) => {
    e.preventDefault();

    // Validate options
    const validOption = validator.trimEverything(this.state.toAddOption);
    const uniqueOption = validator.isUnique(validOption, this.state.options);

    // Option can't be empty and must be unique, case sensitive
    if(validOption && uniqueOption) {

      // Init
      const formatedId = validOption.split(' ').join('-');
      const optionsContainer = document.getElementById('poolOptions');
      const updatedOptions = [...this.state.options, validOption];

      // Create elements
      const div = document.createElement('div');
      const span = document.createElement('span');
      const button = document.createElement('button');

      div.setAttribute('id', formatedId);
      div.setAttribute('data-name', validOption);
      span.innerText = validOption;
      button.innerText = 'x';
      button.addEventListener('click', this.deleteOption);

      // Add to DOM
      div.appendChild(span);
      div.appendChild(button);
      optionsContainer.appendChild(div);

      this.setState({ toAddOption: '', options: [...updatedOptions] });
    }
  }

  deleteOption = (e) => {
    const formatedId = e.target.parentNode.id.split(' ').join('-');
    const name = e.target.parentNode.attributes['data-name'].value;
    const updatedOptions = this.state.options.filter(option => option != name);

    document.getElementById(formatedId).remove();
    this.setState({ options: [...updatedOptions] });
  }

  goBack = () => {
    this.props.history.goBack();
  }

  handleSubmit = () => {

    // Validate pool
    const trimmedPoolName = validator.trimEverything(this.state.name);
    const validPool = validator.isValidPool(trimmedPoolName, this.state.options);

    if(validPool) {
      const poolOptions = this.state.options.map((option, index) => {
        return {
          id: index,
          option,
          votes: 0
        }
      });
      const timestamp = Date.now();
      const id = generator.generateId(this.state.name, this.props.creatorName, timestamp);
      const createdPool = {
        name: this.state.name,
        options: poolOptions,
        dateCreated: Date(),
        creator: this.props.creatorName,
        id: id
      };

      this.props.createPool_f(createdPool);
      this.props.addOwnPoolToProfile_f(this.props.creatorName, id);
      this.setState({ options: [], name: '', redirect: true });

      alert(`Pool "${trimmedPoolName}" Created`);
      this.goBack();
    } else {
      alert('Pool must have a name at least three letters long and there must be at least two options for which you can vote!');
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <h2>Create Pool</h2>
        <div>
          <label>Pool Name</label><br />
          <input type='text' value={this.state.name} onChange={this.handlePoolNameChange} placeholder='enter pool name' /><br /><br />
          <form onSubmit={this.addOption}>
            <input type='text' value={this.state.toAddOption} onChange={this.handleOptionChange} />
            <input type='submit' value='add option' />
          </form>
        </div>
        <br />
        <h4>options:</h4>
        <div id='poolOptions'>
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default CreatePool;
