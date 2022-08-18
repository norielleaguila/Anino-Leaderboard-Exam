import { Action } from "actionhero";
import { userUpdate } from "./../modules/users";
import * as Entries from "./../modules/entries";

export class EntryAdd extends Action {
    constructor() {
        super();
        this.name = "entryAdd";
        this.description = "API end-point for adding a user score entry to a leaderboard";
        this.outputExample = { };
        
        this.inputs = {
            _id: { required: true },
            user_id: { required: true},
            score_to_add: { required: true }
        };
    }

    async run(data) {
        const entry = await Entries.entryAdd(data.params._id, data.params.user_id, data.params.score_to_add);
        await userUpdate(data.params.user_id);
        return { entry };
    }
}