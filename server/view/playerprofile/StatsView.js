class StatsView {

    constructor(assistThrowawayRatio, assists, dTurnoverRatio, 
                ds, goals, receiverError,
                salary, secondAssists, throaways,
                timesTraded, wins) {

        this._assistThrowawayRatio = assistThrowawayRatio;
        this._assists = assists;
        this._dTurnoverRatio = dTurnoverRatio;
        this._ds = ds;
        this._goals = goals,
        this._receiverError = receiverError;
        this._salary = salary,
        this._secondAssists = secondAssists;
        this._throaways = throaways;
        this._timesTraded = timesTraded;
        this._wins = wins;
    }

    setAssistThroawayRatio(assistThrowawayRatio) {
        this._assistThrowawayRatio = assistThrowawayRatio;
    }

    setAssists(assists){
        this.assists = assists;
    }

}

export default StatsView;