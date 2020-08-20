import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import PlayerProfileCard from './players/PlayerProfileCard';

export default class SearchAutoComplete extends Component {
    // makes it mandatory, don't need
    static propTypes = {
        suggestions: PropTypes.instanceOf(Array)
      };
    
      static defaultProps = {
        suggestions: []
      };
    
        constructor(props) {
            super(props);

            this.state = {
                
                serverExecutionTime: null,  
                serverResponseStatus: null,
                response: {},
                foundPlayers: [],

                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
                userInput: "",
            };
      }
    
      // Event fired when the input value is changed
      onChange = e => {
        const { suggestions } = this.props;
        // const suggestions = this.state.suggestions;
        const userInput = e.currentTarget.value;
    
        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
          suggestion =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        // Update the user input and filtered suggestions, reset the active
        // suggestion and make sure the suggestions are shown
        this.setState({
          activeSuggestion: 0,
          filteredSuggestions,
          showSuggestions: true,
          userInput: e.currentTarget.value
        });
      };
    
      // Event fired when the user clicks on a suggestion
      onClick = e => {
        // Update the user input and reset the rest of the state
        this.setState({
          activeSuggestion: 0,
          filteredSuggestions: [],
          showSuggestions: false,
          userInput: e.currentTarget.innerText
        });
      };
    
      // Event fired when the user presses a key down
      onKeyDown = e => {
        const { activeSuggestion, filteredSuggestions } = this.state;
    
        // User pressed the enter key, update the input and close the
        // suggestions
        if (e.keyCode === 13) {
          this.setState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion]
          });
        }
        // User pressed the up arrow, decrement the index
        else if (e.keyCode === 38) {
          if (activeSuggestion === 0) {
            return;
          }
    
          this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
          if (activeSuggestion - 1 === filteredSuggestions.length) {
            return;
          }
    
          this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
      };

        // can set it up like a regular function, 
        // but you would always have to set .bind(this) at the end of each methdo call
        onSubmit = (e) => {
            e.preventDefault();
            if (this.state.userInput === '') {
                // this.setAlert('Please enter something', 'light');
            } else {
                this.searchUsers(this.state.userInput);
                this.setState({ 
                    userInput: '',
                    serverExecutionTime: null
                });
                
            }
        };

      searchUsers(searchTerm) {
        let asciiSearchTerm = encodeURIComponent(searchTerm.trim());
        let endpoint = `/players/individual/person?name=${asciiSearchTerm}`;
        axios.get(endpoint).then(response => {
            const serverResponseData = response.data;
            console.log(response.data);
            this.setState( {
                // response: response
                serverExecutionTime: serverResponseData.msExecutionTime,
                serverResponseStatus: response.status,
                foundPlayers: serverResponseData.result
            })
        })
        .catch(err => {
            this.setState({
                serverResponseStatus: err.response.status
            })
        });
    }
    
      render() {
        const {
          onChange,
          onClick,
          onKeyDown,
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
              <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                  let className;
    
                  // Flag the active suggestion with a class
                  if (index === activeSuggestion) {
                    className = "suggestion-active";
                  }
    
                  return (
                    <li
                      className={className}
                      key={suggestion}
                      onClick={onClick}
                    >
                      {suggestion}
                    </li>
                  );
                })}
              </ul>
            );
          } else {
            suggestionsListComponent = (
              <div className="no-suggestions">
                <em>No suggested players</em>
              </div>
            );
          }
        }

        // deconstruct state parameters
        const { foundPlayers, serverResponseStatus, serverExecutionTime} = this.state;
        let searchStatus;
        let searchOutput;
        
        const playerGridStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '1rem'
        }

        if (serverResponseStatus && serverResponseStatus !== 200) {
            searchStatus = <p id="search_execution_time">Player(s) not found...</p>;
        } else {
            if (serverExecutionTime != null) {
                searchStatus = <p id="search_execution_time">Players found: <b>{ foundPlayers ? foundPlayers.length : 0 }</b> execution time is: { serverExecutionTime } ms</p>;
            }
            searchOutput = foundPlayers.map((player, index) =>(
                                <PlayerProfileCard key = { index } player = { player }/>
                            ));
        }
    
        return (
          <Fragment>
            <div className="container">
                <form onSubmit= { this.onSubmit } className = "form">
                    <div className="row">
                        <div className="col-6">
                            <input
                                type="text"
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                value={userInput}
                                placeholder="search for players..." 
                            />
                            {suggestionsListComponent}
                        </div>
                        <div className="col-6">
                            <input type="submit"
                                value="search"
                                disabled= { !this.state.userInput }
                                className = "btn btn-secondary btn-block"
                            />  
                        </div>
                    </div>
                </form>
            </div>
            <div className="container">
                <div style={{padding: "2px" }}>
                    { searchStatus }
                </div>
                <div style = { playerGridStyle }>
                    { searchOutput }
                </div>
            </div>
          </Fragment>
        );
      }
    }
