import * as CollectionModule from "./../classes/collectionModules";

/**
 * function to add an entry
 * will check if board and the user exists, then attempts to add a new entry or update a previous entry
 * @param _id unique leaderboard id
 * @param user_id unique user id
 * @param score_to_add score to be added to user's entry
 * @returns data update detail
 */
export async function entryAdd ( _id: string, user_id: string, score_to_add: string ) {
    const dbRef = CollectionModule.firestore().collection(CollectionModule.leaderboardPath);
    const entriesRef = CollectionModule.firestore().collection(CollectionModule.entriesPath);
    const userRef = CollectionModule.firestore().collection(CollectionModule.usersPath);

    let board = await dbRef.doc(_id).get();
    let user = await userRef.doc(user_id).get();
    let docID = `${user_id}-${_id}`;
    let userEntry, userData;
    let data, res;

    if(!board.exists) 
        throw new Error("Board does not exist");
    if(!user.exists)
        throw new Error("User does not exist");

    userEntry = await entriesRef.doc(docID).get();
    userData = user.data();

    if(!userEntry.exists){ 
        data = {
            name: userData.name,
            score: parseInt(score_to_add),
            scored_at: CollectionModule.generateTimestamp(),
            user_id: user_id,
            board_id: _id
        };

        await entriesRef.doc(docID).set(data); 

        res = { ...data, _id: docID }
    } else {
        let entryScore = userEntry.data().score + parseInt(score_to_add);
        
        await entriesRef.doc(docID).update({score: entryScore});

        data = await entriesRef.doc(docID).get();
        
        res = { 
            _id: docID,
            board_id: data.data().board_id,
            score: data.data().score,
            scored_at: data.data().scored_at,
            user_id: data.data().user_id
        }
    }

    return res;
}