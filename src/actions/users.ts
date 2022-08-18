import { Action } from "actionhero";
import * as Users from "./../modules/users";

export class UserAdd extends Action {
    constructor() {
        super();
        this.name = "userAdd";
        this.description = "API end-point for creating a user";
        this.outputExample = { _id:  "<randomized ID>", name: "Randy", updated_at: "<timestamp>", created_at: "<timestamp>"};
        
        this.inputs = {
            name: { required: true }
        };
    }

    async run(data) {
        const res = await Users.userAdd(data.params.name);
        return { res };
    }
}

export class UserGet extends Action {
    constructor() {
        super();
        this.name = "userGet";
        this.description = "API end-point for retrieving a user";
        this.outputExample = { _id:  "<randomized ID>", name: "Randy", updated_at: "<timestamp>", created_at: "<timestamp>"};
        
        this.inputs = {
            _id: { required: true }
        };
    }

    async run(data) {
        const res = await Users.userGet(data.params._id);
        return { res };
    }
}