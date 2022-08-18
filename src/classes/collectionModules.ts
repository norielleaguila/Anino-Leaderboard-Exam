import { api } from "actionhero";

const { FieldValue } = require('firebase-admin/firestore');

export const leaderboardPath = "leaderboards";
export const entriesPath = "entries";
export const usersPath = "users";

export function generateTimestamp() {
    return new Date(Date.now()).toISOString();
}

export function firestore() {
    return api.firestore;
}