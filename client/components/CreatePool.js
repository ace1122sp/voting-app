import React, { Component } from 'react';

import Portal from './Portal';
import Loading from './Loading';

import { validator } from '../util/validator';

class CreatePool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      toAddOption: '',
      options: [],
      incorrectPool: false,
      poolCreated: false
    }
  }

  handlePoolNameChange = e => {
    this.setState({ name: e.target.value, incorrectPool: false });
  }

  handleOptionChange = e => {
    this.setState({ toAddOption: e.target.value, incorrectPool: false });
  }

  addOption = e => {
    e.preventDefault();

    // Validate options
    const validOption = validator.trimEverything(this.state.toAddOption);
    const uniqueOption = validator.isUniqueOption(validOption, this.state.options);

    // Option can't be empty and must be unique, case sensitive
    if(validOption && uniqueOption) {

      // Init
      const formatedId = validOption.split(' ').join('-');
      const option = {
        id: formatedId,
        value: validOption
      };
      const optionsContainer = document.getElementById('poolOptions');
      const updatedOptions = [...this.state.options, option];

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
      console.log(updatedOptions)
      this.setState({ toAddOption: '', options: [...updatedOptions] });
    }
  }

  deleteOption = e => {
    const formatedId = e.target.parentNode.id.split(' ').join('-');
    const name = e.target.parentNode.attributes['data-name'].value;
    const updatedOptions = this.state.options.filter(option => option != name);

    document.getElementById(formatedId).remove();
    this.setState({ options: [...updatedOptions] });
  }

  showIncorrectPoolWarning = () => 
    <p>Pool must have a name at least three letters long and there must be at least two options for which you can vote!</p>

  handleRedirect = () => {
    this.props.history.goBack();
  }

  poolCreatedPortal = () => 
    <Portal>
      <h1>Pool Created</h1>  
      <p>Pool {validator.trimEverything(this.state.name)} has been created.</p>
      <button onClick={this.handleRedirect}>ok</button>
    </Portal>
  
  handleSubmit = () => {

    // Validate pool
    const trimmedPoolName = validator.trimEverything(this.state.name);
    const validPool = validator.isValidPool(trimmedPoolName, this.state.options);

    if (validPool) {

      const createdPool = {
        name: this.state.name,
        options: this.state.options,
      };

      this.props.createPool_f(createdPool);
      this.setState({ options: [], poolCreated: true });
    } else {
      this.setState({ incorrectPool: true });
    }
  }

  render() {
    if (this.props.fetching) return <Loading />;

    return (
      <div>
        {this.state.poolCreated && this.poolCreatedPortal()}
        {this.state.incorrectPool && this.showIncorrectPoolWarning()}
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
