import * as CollectionModule from "./../classes/collectionModules";

export async function leaderboardAdd ( name: string ) {
    const dbRef = CollectionModule.firestore().collection(CollectionModule.leaderboardPath);

    let board = await dbRef.where('name', '==', name).get();
    let data, res;

    if(!board.empty)
        throw new Error("Board already exists");

    data = { name: name , entries: []};
    res = await dbRef.add(data);

    return { _id: res.id, name: name };
}

export async function leaderboardGet ( _id: string, per_page: string, page: string) {
    const boardRef = CollectionModule.firestore().collection(CollectionModule.leaderboardPath);
    const dbRef = CollectionModule.firestore().collection(CollectionModule.entriesPath);
    const board = await boardRef.doc(_id).get();

    let per_pageDefault = "10",
        pageDefault =  "1";
    let entries = [];
    let pageOffset, rank;
    let data, res;
    
    if(!board.exists) 
        throw new Error("Board does not exist");

    page = page !== undefined ? page : pageDefault;
    per_page = per_page !== undefined ? per_page : per_pageDefault

    pageOffset = parseInt(per_page) * (parseInt(page) - 1);
    data = await dbRef.where('board_id', '==', _id).orderBy('score', 'desc').orderBy('scored_at').limit(parseInt(per_page)).offset(pageOffset).get();
    rank = pageOffset;

    data.forEach( (doc) => entries.push({
        score: doc.data().score,
        user_id: doc.data().user_id,
        scored_at: doc.data().scored_at,
        rank: rank++,
        name: doc.data().name
    }))

    if(data.size < 1)
        throw new Error("Board is empty")

    res = {
        _id: _id,
        name: board.data().name,
        entries: entries
    };

    return res;
}
