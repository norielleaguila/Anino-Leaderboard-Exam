import { api, Initializer } from "actionhero";

require('dotenv').config();

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require(process.env.FIRESTORE_PATH);

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


