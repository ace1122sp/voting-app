import React, { Component } from 'react';

import { validator } from '../util/validator';

import '../style/CreatePool.css';

import Loading from './Loading';
import Portal from './Portal';

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
      const li = document.createElement('li');
      const span = document.createElement('span');
      const button = document.createElement('button');

      li.setAttribute('id', formatedId);
      li.setAttribute('data-name', validOption);
      span.innerText = validOption;
      button.innerText = 'x';
      button.className = 'neutral-btn';
      button.addEventListener('click', this.deleteOption);

      // Add to DOM
      li.appendChild(span);
      li.appendChild(button);
      optionsContainer.appendChild(li);
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
    <p className='warning-msg'>Pool must have a name at least three letters long and there must be at least two options for which you can vote!</p>

  handleRedirect = () => {
    this.props.history.goBack();
  }

  poolCreatedPortal = () => 
    <Portal>
      <div className='portal-inner-wrap pool-shadow'>
        <h2>Pool Created</h2>  
        <p>Pool {validator.trimEverything(this.state.name)} has been created.</p>
        <button className='aggressive-btn' onClick={this.handleRedirect}>Ok</button>
      </div>
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
      <main className='wrapper wrap-flex-start'>
        {this.state.poolCreated && this.poolCreatedPortal()}
        {this.state.incorrectPool && this.showIncorrectPoolWarning()}
        <h2>Create Pool</h2>
        <section className='pool-section pool-shadow'>
          <label>Pool Name</label>
          <br />
          <input type='text' value={this.state.name} onChange={this.handlePoolNameChange} placeholder='enter pool name' />
          <br /><br />
          <form onSubmit={this.addOption}>
            <input type='text' value={this.state.toAddOption} onChange={this.handleOptionChange} />
            <button className='add-neutral-btn'>Add Option</button>
          </form>
        </section>
        <h3>options:</h3>
        <ul id='poolOptions' className='options-list'>
        </ul>
        <br />
        <button className='aggressive-btn' onClick={this.handleSubmit}>Submit</button>
      </main>
    );
  }
}

export default CreatePool;
