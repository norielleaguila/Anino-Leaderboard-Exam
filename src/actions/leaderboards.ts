import { Action } from "actionhero";
import * as Leaderboards from "./../modules/leaderboards";

export class LeaderboardAdd extends Action {
    constructor() {
        super();
        this.name = "leaderboardAdd";
        this.description = "API end-point for creating a leaderboard";
        this.outputExample = { };
        
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
        this.outputExample = { };
        
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
