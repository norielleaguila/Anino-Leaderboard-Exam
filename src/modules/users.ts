import * as CollectionModule from "./../classes/collectionModules";

/**
 * function to create or update a user
 * checks if user exists, then creates or updates the user
 * @param name 
 * @returns user id and name
 */
export async function userAdd ( name: string ) {
    const dbRef = CollectionModule.firestore().collection(CollectionModule.usersPath);
    const user = await dbRef.where('name', '==', name).get();
    let res, data;

    if(!user.empty) 
        throw new Error("User already exists");
    
    data = {
        name: name, 
        created_at: CollectionModule.generateTimestamp(),
        updated_at: CollectionModule.generateTimestamp()
    };

    res = await dbRef.add(data);

    return { 
        _id: res.id, 
        name: name 
    };
}

export async function userGet ( _id: string ) {
    const dbRef = CollectionModule.firestore().collection(CollectionModule.usersPath);
    const user = await dbRef.doc(_id).get();

    if (!user.exists)
        throw new Error("User does not exist");

    return {
        _id: user.id,
        name: user.data().name
    };
}

export async function userUpdate ( _id: string ) {
    const dbRef = CollectionModule.firestore().collection(CollectionModule.usersPath);
    const user = await dbRef.doc(_id).get();
    let res, data;

    if (!user.exists)
        throw new Error("User does not exist");

    data = {
        updated_at: CollectionModule.generateTimestamp()
    }

    res = await dbRef.doc(user.id).update(data);

    return res;
}