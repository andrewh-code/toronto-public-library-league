import BaseController from './BaseController.js';
// mocking of player data
import playerData from '../../model/players.js';

class EStatsController extends BaseController {

    constructor() {
        super();
        this.retrieveGoalLeaders = this.retrieveGoalLeaders.bind(this);
        this.retrieveAssistLeaders = this.retrieveAssistLeaders.bind(this);
        this.retrieveSalaryLeaders = this.retrieveSalaryLeaders.bind(this);
        this.retrieveSecondAssistLeaders = this.retrieveSecondAssistLeaders.bind(this);
        this.retrieveDefensiveLeaders = this.retrieveDefensiveLeaders.bind(this);
        this.retrieveWinsLeaders = this.retrieveWinsLeaders.bind(this);


        this._validateQueryParameters = this._validateQueryParameters.bind(this);
        this._currencyToInt = this._currencyToInt.bind(this);
        this._retrievePlayersFromFile = this._retrievePlayersFromFile.bind(this);
    }

    retrieveSalaryLeaders(request, response) {
        // spread operator used to clone object in ES6 but does not copy nested attributes
        
        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters seasonId, sex, sort, and limit are correct");
        }

        let seasonId = request.query.seasonId
        let sort = request.query.sort;
        let limit = request.query.limit;
        let sex = request.query.sex;
        let seasonData = this._retrievePlayersFromFile(seasonId, playerData)
        let players = JSON.parse(JSON.stringify(seasonData));

        let sortedPlayers = [];
        if (sort === "asc") {
            sortedPlayers = players.sort((a, b) => {
                let currA = a.stats.salary.replace(/(,|\$)/g, "");
                let nextB = b.stats.salary.replace(/(,|\$)/g, "");
                a.stats.salary = currA;
                b.stats.salary = nextB;

                // parseInt(currA, 10) > parseInt(nextB, 10) ? 1 : -1;
                return Number(currA) > Number(nextB) ? 1 : -1;
            })
        } else if (sort === "desc") {
            sortedPlayers = players.sort((a, b) => {
                let currA = a.stats.salary.replace(/(,|\$)/g, "");
                let nextB = b.stats.salary.replace(/(,|\$)/g, "");
                a.stats.salary = currA;
                b.stats.salary = nextB;
                return Number(a.stats.salary) > Number(b.stats.salary) ? -1 : 1;
            })
        } else {
            return this.return400(response, request, "sort query parameter must be either 'asc' or 'desc'");
        }
        
        let result = sortedPlayers.slice(0, limit);

        return this.return200(response, request, result);
    }

    // sort and limit qp
    retrieveGoalLeaders(request, response) {
        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters seasonId, sex, sort, and limit are correct");
        }
        
        let seasonId = request.query.seasonId
        let sort = request.query.sort;
        let limit = request.query.limit;
        let seasonData = this._retrievePlayersFromFile(seasonId, playerData)
        let players = JSON.parse(JSON.stringify(seasonData));

        if (sort === "asc") {
            players.sort((a, b) => (parseInt(a.stats.goals, 10) > parseInt(b.stats.goals, 10)) ? 1 : -1);
        } else if (sort === "desc") {
            players.sort((a, b) => (parseInt(a.stats.goals, 10) > parseInt(b.stats.goals, 10)) ? -1 : 1);
        } else {
            return this.return400(response, request, "sort query parameter must be either 'asc' or 'desc'");
        }

        let result = players.slice(0, limit);

        return this.return200(response, request, result);
    }

    retrieveAssistLeaders(request, response) {

        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters seasonId, sex, sort, and limit are correct");
        }

        let seasonId = request.query.seasonId
        let sort = request.query.sort;
        let limit = request.query.limit;
        let sex = request.query.sex;
        let seasonData = this._retrievePlayersFromFile(seasonId, playerData)
        let players = JSON.parse(JSON.stringify(seasonData));

        if (sort === "asc") {
            players.sort((a, b) => (parseInt(a.stats.assists, 10) > parseInt(b.stats.assists, 10)) ? 1 : -1);
        } else if (sort === "desc") {
            players.sort((a, b) => (parseInt(a.stats.assists, 10) > parseInt(b.stats.assists, 10)) ? -1 : 1);
        } else {
            return this.return400(response, request, "sort query parameter must be either 'asc' or 'desc'");
        }

        let result = players.slice(0, limit);

        return this.return200(response, request, result);
    }

    retrieveSecondAssistLeaders(request, response) {

        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters seasonId, sex, sort, and limit are correct");
        }

        let seasonId = request.query.seasonId
        let sort = request.query.sort;
        let limit = request.query.limit;
        let sex = request.query.sex;
        let seasonData = this._retrievePlayersFromFile(seasonId, playerData)
        let players = JSON.parse(JSON.stringify(seasonData));

        if (sort === "asc") {
            players.sort((a, b) => (parseInt(a.stats.secondAssists, 10) > parseInt(b.stats.secondAssists, 10)) ? 1 : -1);
        } else if (sort === "desc") {
            players.sort((a, b) => (parseInt(a.stats.secondAssists, 10) > parseInt(b.stats.secondAssists, 10)) ? -1 : 1);
        } else {
            return this.return400(response, request, "sort query parameter must be either 'asc' or 'desc'");
        }

        let result = players.slice(0, limit);

        return this.return200(response, request, result);
    }

    retrieveDefensiveLeaders(request, response) {

        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters seasonId, sex, sort, and limit are correct");
        }

        let seasonId = request.query.seasonId
        let sort = request.query.sort;
        let limit = request.query.limit;
        let sex = request.query.sex;
        let seasonData = this._retrievePlayersFromFile(seasonId, playerData)
        let players = JSON.parse(JSON.stringify(seasonData));

        if (sort === "asc") {
            players.sort((a, b) => (parseInt(a.stats.ds, 10) > parseInt(b.stats.ds, 10)) ? 1 : -1);
        } else if (sort === "desc") {
            players.sort((a, b) => (parseInt(a.stats.ds, 10) > parseInt(b.stats.ds, 10)) ? -1 : 1);
        } else {
            return this.return400(response, request, "sort query parameter must be either 'asc' or 'desc'");
        }

        let result = players.slice(0, limit);

        return this.return200(response, request, result);
    }

    retrieveWinsLeaders(request, response) {

        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters seasonId, sex, sort, and limit are correct");
        }

        let seasonId = request.query.seasonId
        let sort = request.query.sort;
        let limit = request.query.limit;
        let sex = request.query.sex;
        let seasonData = this._retrievePlayersFromFile(seasonId, playerData)
        let players = JSON.parse(JSON.stringify(seasonData));

        if (sort === "asc") {
            players.sort((a, b) => (parseFloat(a.stats.wins, 10) > parseFloat(b.stats.wins, 10)) ? 1 : -1);
        } else if (sort === "desc") {
            players.sort((a, b) => (parseFloat(a.stats.wins, 10) > parseFloat(b.stats.wins, 10)) ? -1 : 1);
        } else {
            return this.return400(response, request, "sort query parameter must be either 'asc' or 'desc'");
        }

        let result = players.slice(0, limit);

        return this.return200(response, request, result);
    }

    // check query parameters
    _validateQueryParameters(queryParameters) {

         if (!queryParameters.sort || !queryParameters.limit || !queryParameters.sex || !queryParameters.seasonId) {
             return false;
         }

         if (queryParameters.sort != "asc" && queryParameters.sort != "desc") {
             return false;
         }
         
         if (isNaN(queryParameters.limit) || parseInt(queryParameters.limit) < 0) {
             return false;
         }

         if (queryParameters.sex != "M" && queryParameters.sex != "F") {
             return false;
         }

         return true;
    }

    _currencyToInt(currencyValue) {
        // just remove the dollar sign and commas
        let output = currencyValue.replace(/(,|\$)/g, "");
        return output;
    }

    // if I use arrow function, won't have to bind?
    _retrievePlayersFromFile(seasonId, playerData) {
        let players = [];
        // let error = false;
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
                break;
        }

        return players;
    }
    
    

}

export default EStatsController;