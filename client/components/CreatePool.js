import React, { Component } from 'react';

const testUniqueness = (testElement, arr) => !(arr.some(el => el == testElement))

class CreatePool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      toAddOption: '',
      options: []
    }

    this.handlePoolNameChange = this.handlePoolNameChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePoolNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleOptionChange(e) {
    this.setState({ toAddOption: e.target.value });
  }

  addOption(e) {
    e.preventDefault();
    const validOption = this.state.toAddOption.trim();
    const uniqueOption = testUniqueness(validOption, this.state.options);

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

  deleteOption(e) {
    const formatedId = e.target.parentNode.id.split(' ').join('-');
    const name = e.target.parentNode.attributes['data-name'].value;
    const updatedOptions = this.state.options.filter(option => option != name);

    document.getElementById(formatedId).remove();
    this.setState({ options: [...updatedOptions] });
  }

  handleSubmit() {
    // This is fake functionality

    // let optionsElement = document.getElementById('poolOptions');
    // const options = Object.assign({});
    //
    // this.setState({ options, name: '' });
    // alert('Pool Created');
  }

  render() {
    return (
      <div>
        <h2>Create Pool</h2>
        <div>
          <label>Pool Name</label><br />
          <input type='text' value={this.state.name} onChange={this.handlePoolNameChange} placeholder='enter pool name' /><br /><br />
          <form onSubmit={this.addOption}>
            <input type='text' value={this.state.toAddOption} onChange={this.handleOptionChange} />
            <input type='submit' value='add' />
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
