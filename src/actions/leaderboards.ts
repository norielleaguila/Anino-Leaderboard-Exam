import { Action } from "actionhero";
import * as Leaderboards from "./../modules/leaderboards";

export class LeaderboardAdd extends Action {
    constructor() {
        super();
        this.name = "leaderboardAdd";
        this.description = "API end-point for creating a leaderboard";
        this.outputExample = {
            board: {
                _id: "<unique id>",
                name: "test leaderboard"
            }
        };
        
        this.inputs = {
            name: { required: true }
        };
    }

    async run(data) {
        const board = await Leaderboards.leaderboardAdd(data.params.name);
        return { board };
    }
}

export class LeaderboardGet extends Action {
    constructor() {
        super();
        this.name = "leaderboardGet";
        this.description = "API end-point for retrieving a leaderboard";
        this.outputExample = {
            board: {
                _id: "<unique id>",
                name: "WatchMojo Top 10",
                entries: [{
                    score: "<number>",
                    user_id: "<unique id>",
                    scored_at: "2022-08-18T18:49:34.633Z",
                    rank: "<number>",
                    name: "<user name>"
                }]
            }
        };

        this.inputs = {
            _id: { required: true },
            per_page: { required: false },
            page: { required: false },
        };
    }

    async run(data) {
        const board = await Leaderboards.leaderboardGet(data.params._id, data.params.per_page, data.params.page);
        return { board };
    }
}
