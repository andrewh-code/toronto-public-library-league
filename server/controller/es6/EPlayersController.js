import playerData from '../../model/players';
import BaseController from './BaseController';
import PlayerInfoView from '../../view/playerprofile/PlayerInfoView';
import SeasonDataInfo from '../../data/SeasonDataInfo';

class EPlayersController extends BaseController {

    constructor(){
        super();
        // have no clue why I can't access this data. Do I need a get/set method?
        // this._test = "ahello test";
        // this._playerData = playerData.playerData;
        this.hiPlayers = this.hiPlayers.bind(this);
        this.retrieveAllPlayers = this.retrieveAllPlayers.bind(this);
        this.searchRetrievePlayers = this.searchRetrievePlayers.bind(this);
        this.retrievePlayerProfileFromZuluruId = this.retrievePlayerProfileFromZuluruId.bind(this);
        this.retrieveAllPlayersBySeason = this.retrieveAllPlayersBySeason.bind(this);
    };

    hiPlayers(request, response) {
        return this.return200(response, request.uuid, "hi");
    }

    retrieveAllPlayers(request, response) {
        let season10Players = playerData.season10Data;
        let season09Players = playerData.season09Data;
        return this.return200(response, request.uuid, season09Players);
    }

    /**
     * retrieve season leaders for :seasonId
     * @param {*} request 
     * @param {*} response 
     */
    retrieveAllPlayersBySeason(request, response) {

        // check if season id is null/blank
        let seasonId = request.params.seasonId;
        let players = null;
        let error = false;
        switch(parseInt(seasonId)) {
            case 16:
                players = playerData.season16Data;
                break;
            case 14:
                players = playerData.season14Data;
                break;
            case 13:
                players = playerData.season13Data;
                break;
            case 12:
                players = playerData.season12Data;
                break;
            case 11:
                players = playerData.season11Data;
                break;
            case 10:
                players = playerData.season10Data;
                break;
            case 9:
                players = playerData.season09Data;
                break;
            case 8:
                players = playerData.season08Data;
                break;
            case 7:
                players = playerData.season07Data;
                break;
            case 5:
                players = playerData.season05Data;
                break;
            default:
                players = "unable to find players for current season: " + seasonId;
                error = true;
                break;
        }
        
        if (error){
            return this.return404(response, request.uuid, players);
        }
        return this.return200(response, request.uuid, players);
    }

    // this should just return the player bame, their zid, and most recent season's stats
    // used for the search front end feature
    searchRetrievePlayers(request, response) {
        let queryParamName = request.query.name;
        if (!queryParamName) {
            return response.status(404).json("player not found");
        }
        let queryNameArr = queryParamName.split(" ");
        
        
        let players = [];
        let season16Players = playerData.season16Data;
        let season14Players = playerData.season14Data;
        let season13Players = playerData.season13Data;
        let season12Players = playerData.season12Data;
        let season11Players = playerData.season11Data;
        let season10Players = playerData.season10Data;
        let season09Players = playerData.season09Data;
        let season08Players = playerData.season08Data;
        let season07Players = playerData.season07Data;
        let season05Players = playerData.season05Data;

        players = season10Players
                    .concat(season09Players)
                    .concat(season08Players)
                    .concat(season07Players)
                    .concat(season05Players)
                    .concat(season11Players)
                    .concat(season12Players)
                    .concat(season13Players)
                    .concat(season14Players)
                    .concat(season16Players);

        let foundPlayers = [];
        let i;
        let j = 0;
        let nameFoundMap = new Map();
        
        for (i = 0; i < queryNameArr.length; i++){
            let qryStrToFind = queryNameArr[i].toLowerCase();
            console.log(qryStrToFind);
            while (j < players.length) {
                let name = players[j].name.toLowerCase();
                console.log(name);
                if (name.includes(qryStrToFind)) {
                    let keyNameFound = name.toLowerCase().replace(/ /g, '');
                    // check to see if it's in map
                    if (!nameFoundMap.has(keyNameFound)){
                        nameFoundMap.set(keyNameFound, 1);
                        foundPlayers.push(players[j]);
                    }
                }
                j++;
            }
        }
        console.log(nameFoundMap);
        if (foundPlayers.length < 1){
            return this.return404(response, request.uuid, "player not found");
        }
        return this.return200(response, request.uuid, foundPlayers);
    }

    // this should return all of the player's information (including all stats);
    retrievePlayerProfileFromZuluruId(request, response) {   
        // const pictureUrl = "http://localhost:1234/img/male_default_pic.jpg";
        let id = request.params.zuluruId;
        const pictureUrl = "http://localhost:1234/img/pokemon/" + id + ".png";
        // iterate over array
        let players16Data = playerData.season16Data;
        let players14Data = playerData.season14Data;
        let players13Data = playerData.season13Data;
        let players12Data = playerData.season12Data;
        let players11Data = playerData.season11Data;
        let players10Data = playerData.season10Data;
        let players09Data = playerData.season09Data;
        let players08Data = playerData.season08Data;
        let players07Data = playerData.season07Data;

        
        // check if parseInt() not just number
        if (!id || isNaN(id)) {
            return this.return400(response, request.uuid, "please provide an integer value for the player id in endpoint")
        }

        let seasonsPlayerInfoArray = [];

        let season16playerInfo = players16Data.find((x) => x.zuluruId == id);
        if (season16playerInfo) {
            seasonsPlayerInfoArray.push(season16playerInfo);
        }

        let season14playerInfo = players14Data.find((x) => x.zuluruId == id);
        if (season14playerInfo) {
            seasonsPlayerInfoArray.push(season14playerInfo);
        }

        let season13playerInfo = players13Data.find((x) => x.zuluruId == id);
        if (season13playerInfo) {
            seasonsPlayerInfoArray.push(season13playerInfo);
        }

        let season12playerInfo = players12Data.find((x) => x.zuluruId == id);
        if (season12playerInfo) {
            seasonsPlayerInfoArray.push(season12playerInfo);
        }

        let season11playerInfo = players11Data.find((x) => x.zuluruId == id);
        if (season11playerInfo) {
            seasonsPlayerInfoArray.push(season11playerInfo);
        }

        let season10playerInfo = players10Data.find((x) => x.zuluruId == id);
        if (season10playerInfo) {
            seasonsPlayerInfoArray.push(season10playerInfo);
        }
        
        let season09playerInfo = players09Data.find((x) => x.zuluruId == id);
        if (season08playerInfo) {
            seasonsPlayerInfoArray.push(season09playerInfo);
        }

        let season08playerInfo = players08Data.find((x) => x.zuluruId == id);
        if (season08playerInfo) {
            seasonsPlayerInfoArray.push(season08playerInfo);
        }

        let season07playerInfo = players07Data.find((x) => x.zuluruId == id);
        if (season07playerInfo) {
            seasonsPlayerInfoArray.push(season07playerInfo);
        }
        
        let i;
        let playerInfoView = new PlayerInfoView(null, null);
        for (i = 0; i < seasonsPlayerInfoArray.length; i++){
            if (seasonsPlayerInfoArray[i].zuluruId) {
                if (!playerInfoView.zuluruId && !playerInfoView.name) {
                    playerInfoView.setZuluruId = seasonsPlayerInfoArray[i].zuluruId;
                    playerInfoView.setName = seasonsPlayerInfoArray[i].name;
                    playerInfoView.setSex = seasonsPlayerInfoArray[i].sex;
                }
                playerInfoView.pushStats(seasonsPlayerInfoArray[i].stats);
            }
        }
        playerInfoView.setPicture = pictureUrl;

        if (!playerInfoView.zuluruId || playerInfoView.zulurId === "null") {
            return this.return404(response, request.uuid, "could not find player with associated id: " + id);
        }

        return this.return200(response, request.uuid, playerInfoView);
    }


    // if I use arrow function, won't have to bind?
    _retrievePlayersFromFiles() {

        let players10Data = playerData.season10Data;
        let players09Data = playerData.season09Data;
        let players08Data = playerData.season08Data;
        let players07Data = playerData.season07Data;

    }
}



export default EPlayersController;