import { api, Initializer } from "actionhero";

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./../keys/anino-leaderboard-firebase-adminsdk-swpxi-293a4320c1.json');

export class FirebaseInitializer extends Initializer {
    constructor(){
        super();
        this.name = "firestore database initializer";
    }

    async initialize() {
        initializeApp({
            credential: cert(serviceAccount)
        });
          
        api.firestore = getFirestore();
    }
}


