import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import NavigationBar from './components/home/NavigationBar';
import SeasonsComponent from './components/seasons/SeasonsComponent';
import PlayerProfile from './components/players/PlayerProfile';
import CurrentSeasonLeadersComponent from './components/leaders/SeasonLeadersComponent';
import About from './components/home/About';
import PlayerProfileCard from './components/players/PlayerProfileCard';
import SearchWrapper from './components/SearchWrapper';
import PlayerComparison from './components/players/compare/PlayerComparison';
import Charting from './components/alpha/Charting';
import TeamPermutation from './components/trade/TeamPermutation';


class App extends Component {

  state = {
    players: [],
    searchPlayerResults: []
  };

  render(){
    // const {players, searchPlayerResults} = this.state;
    return (
      <Router>
        <div className="App">
          <NavigationBar />

        {/* <Route exact path = '/results' render = { props => (
          <PlayerResults/>
        )} /> */}

        {/* <Route exact path = '/' render = { props => {
          <CurrentSeasonLeadersComponent {...props} seasonId = {10}/>
        }}/> */}
        <Route exact path = "/" component = {CurrentSeasonLeadersComponent}/>
        <Route exact path = "/charts" component = {Charting}/>        
        <Switch>
          <Route exact path = '/trade' component = {TeamPermutation } />
          <Route exact path = '/playercard' component = { PlayerProfileCard } />
          <Route exact path = '/about' component = { About } />
          <Route exact path = '/compare' component = { PlayerComparison } />
          <Route exact path = '/search' render = { props => (
            // <Search searchPlayerResults = {searchPlayerResults}/>
            <SearchWrapper {...props} />
          )} />
          <Route exact path = '/player/:zid' render = { props => (
            <PlayerProfile {...props} />
          )} />
          <Route exact path = '/season/16/' render = { props => (
            <SeasonsComponent {...props} seasonId = {16}/>
          )} />
          <Route exact path = '/season/14/' render = { props => (
            <SeasonsComponent {...props} seasonId = {14}/>
          )} />
          <Route exact path = '/season/13/' render = { props => (
            <SeasonsComponent {...props} seasonId = {13}/>
          )} />
          <Route exact path = '/season/12/' render = { props => (
            <SeasonsComponent {...props} seasonId = {12}/>
          )} />
          <Route exact path = '/season/11/' render = { props => (
            <SeasonsComponent {...props} seasonId = {11}/>
          )} />
          <Route exact path = '/season/10/' render = { props => (
            <SeasonsComponent {...props} seasonId = {10}/>
          )} />
          <Route exact path = '/season/9/' render = { props => (
              <SeasonsComponent {...props} seasonId = {9}/>
          )} />
          <Route exact path = '/season/8/' render = { props => (
              <SeasonsComponent {...props} seasonId = {8}/>
          )} />
          <Route exact path = '/season/7/' render = { props => (
              <SeasonsComponent {...props} seasonId = {7}/>
          )} />
          <Route exact path = '/season/5/' render = { props => (
              <SeasonsComponent {...props} seasonId = {5}/>
          )} />
        </Switch>  
      
      </div>
      </Router>
    );
  }
  
}

export default App;
