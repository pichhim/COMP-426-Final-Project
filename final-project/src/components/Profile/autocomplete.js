import React, { Component } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const styles = {
    autocomplete: {
        margin: '0px',
        padding: '10px',
    },
}

const Suggestion = styled.button`
    width: 30vw;
    font-size: 15px;
    border: none;
    :hover {
        background-color: #ECCDC2;
    }
`

export class Autocomplete extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
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
            
                const filteredSuggestions = suggestions.filter(
                  (suggestion) =>
                    suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
                );
            
                this.setState({
                  activeSuggestion: 0,
                  filteredSuggestions,
                  showSuggestions: true,
                  userInput: e.currentTarget.value
                });
              },
            onClick = (e) => {
                this.setState({
                  activeSuggestion: 0,
                  filteredSuggestions: [],
                  showSuggestions: false,
                  userInput: e.currentTarget.innerText
                });
              },
            onKeyDown = (e) => {
                const { activeSuggestion, filteredSuggestions } = this.state;
            
                if (e.keyCode === 13) {
                  this.setState({
                    activeSuggestion: 0,
                    showSuggestions: false,
                    userInput: filteredSuggestions[activeSuggestion]
                  });
                }
                else if (e.keyCode === 38) {
                  if (activeSuggestion === 0) {
                    return;
                  }
            
                  this.setState({ activeSuggestion: activeSuggestion - 1 });
                }
                else if (e.keyCode === 40) {
                  if (activeSuggestion - 1 === filteredSuggestions.length) {
                    return;
                  }
            
                  this.setState({ activeSuggestion: activeSuggestion + 1 });
                }
              },
            state: {
              activeSuggestion,
              filteredSuggestions,
              showSuggestions,
              userInput
            }
          } = this;

        let suggestionsListComponent;
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <div className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {

                            return (
                                <Suggestion className="box" style={styles.autocomplete} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </Suggestion>
                            );
                        })}
                    </div>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
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
                    onKeyDown={onKeyDown}
                    value={userInput}
                />
                {suggestionsListComponent}
            </React.Fragment>
        );
    }
}
export default Autocomplete;