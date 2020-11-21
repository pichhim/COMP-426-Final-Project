import React, { Component } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import styled from 'styled-components';

const styles = {
  autocomplete: {
    margin: '0px',
    padding: '10px',
  },
  absolute: {
    position: 'absolute',
    zIndex: '100'
  },
}

const Suggestion = styled.button`
    width: 400px;
    font-size: 15px;
    border: none;
    :hover {
        background-color: #ECCDC2;
    };
`

function wait(ms, suggestions, userInput) {
  let start = Date.now(),
    now = start;
  while (now - start < ms) {
    now = Date.now();
  }
  return suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
  )
}

export class Autocomplete extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ''
    };
  }

  static defaultProperty = {
    suggestions: []
  };

  render() {
    const {
      onChange = (e) => {
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;

        this.setState({
          showSuggestions: true,
          userInput: e.currentTarget.value
        });

        // acts as debouncing, returns filtered results after 30 seconds of waiting
        const filteredSuggestions = wait(50, suggestions, userInput);

        this.setState({
          filteredSuggestions,
          showSuggestions: true,
          userInput: e.currentTarget.value
        });
      },

      onClick = (e) => {
        this.setState({
          filteredSuggestions: [],
          showSuggestions: false,
          userInput: e.currentTarget.innerText
        });
      },
      state: {
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className="suggestions" style={styles.absolute}>
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <Suggestion className="box" style={styles.autocomplete} key={index} onClick={onClick}>
                  {suggestion}
                </Suggestion>
              );
            })}
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions" style={styles.absolute}>
            <em>No suggestions!</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
          <input
            className="input is-fullwidth"
            type="text"
            id="friendInput"
            placeholder="Enter username here"
            onChange={onChange}
            value={userInput}
          />
          {suggestionsListComponent}
      </React.Fragment>
    );
  }
}
export default Autocomplete;