import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class PlayerProfileCard extends Component {
    
    state = {
        player: {}
    }

    // make player argument/parameter mandatory
    static propTypes = {
        player: PropTypes.object.isRequired
    }

    render() {
        let player = this.props.player;
        let name = player.name;
        let imgUrl = "";  // somehow pass this in from props 
        let seasonId = player.stats.seasonId;
        let goals = player.stats.goals;
        let salary = player.stats.salary;
        let assists = player.stats.assists;
        let ds = player.stats.ds;
        let wins = player.stats.wins;       
        
        if (!imgUrl) {
            // imgUrl = ProcessingInstruction.env.PUBLIC_URL + '/public/male_default_pic.jpg';
            imgUrl = '/male_default_pic.jpg';
        }
        
        // for now send to player 12345
        let zid = (!player.zuluruId ||  player.zuluruId === 0) ? 12345 : player.zuluruId

        return (

            <div className="player_profile_card">
                <div align="center">
                    <div>
                        <img src={ imgUrl } id="player_avatar" alt="player profile pic"/>    
                    </div>
                    <div>
                        <p><b>{ name }</b></p>
                    </div>
                </div>
                <div>
                    <ul>
                        <li>Most Recent Season: { seasonId }</li>
                        <li>Salary: { salary }</li>
                        <li>Goals: { goals }</li>
                        <li>Assists: { assists }</li>
                        <li>Ds: { ds }</li>
                        <li>Wins: { wins }</li>
                    </ul>
                </div>
                <div align="center">
                    <Link to = { `/player/${zid}` } className = 'btn btn-secondary btn-sm my-1'>
                        More
                    </Link>
                    {/* <Route className = 'btn btn-secondary btn-sm my-1' exact path = '/player/:id' render = { props => (
                        <PlayerProfile/>
                    )} /> */}
                </div>
                
            </div>
        )
    }
}

