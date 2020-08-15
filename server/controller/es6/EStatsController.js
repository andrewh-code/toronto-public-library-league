import BaseController from './BaseController';
// mocking of player data
import playerData from '../../model/players';

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
    }

    retrieveSalaryLeaders(request, response) {

        // spread operator used to clone object in ES6 but does not copy nested attributes
        let players = JSON.parse(JSON.stringify(playerData.season10Data));
        
        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters sex, sort, and limit are correct");
        }
        let sort = request.query.sort;
        let limit = request.query.limit;
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
        let players = JSON.parse(JSON.stringify(playerData.season10Data));
        
        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters sex, sort, and limit are correct");
        }
        let sort = request.query.sort;
        let limit = request.query.limit;
        let sex = request.query.sex;

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
        
        let players = JSON.parse(JSON.stringify(playerData.season10Data));

        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters sex, sort, and limit are correct");
        }
        let sort = request.query.sort;
        let limit = request.query.limit;

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
        let players = JSON.parse(JSON.stringify(playerData.season10Data));

        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters sex, sort, and limit are correct");
        }
        let sort = request.query.sort;
        let limit = request.query.limit;

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
        let players = JSON.parse(JSON.stringify(playerData.season10Data));

        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters sex, sort, and limit are correct");
        }
        let sort = request.query.sort;
        let limit = request.query.limit;

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
        let players = JSON.parse(JSON.stringify(playerData.season10Data));

        if (!this._validateQueryParameters(request.query)) {
            return this.return400(response, request, "please verify that the query parameters sex, sort, and limit are correct");
        }
        let sort = request.query.sort;
        let limit = request.query.limit;

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
         if (!queryParameters.sort || !queryParameters.limit || !queryParameters.sex) {
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
        console.log(output);
        return output;
    }
    
    // data needs to be array
    sortAndGetPlayers(sortWay, keyTerm, data) {}
}

export default EStatsController;