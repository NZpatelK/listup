// src/lib/firestore.js
import { db } from './firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const listsCollection = collection(db, 'lists');

export const addList = async (list) => {
    const docRef = await addDoc(listsCollection, list);
    return { id: docRef.id, ...list };
};

export const getAllLists = async () => {
    const snapshot = await getDocs(listsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateListById = async (id, data) => {
    const ref = doc(db, 'lists', id);
    await updateDoc(ref, data);
};

// const updateAllLists = async (updatedLists) => {
//   for (const list of updatedLists) {
//     const ref = doc(db, "lists", list.id);
//     await setDoc(ref, {
//       name: list.name,
//       items: list.items,
//       // add other fields as needed
//     });
//     console.log(`Updated list ${list.id}`);
//   }
// };


export const deleteListById = async (id) => {
    const ref = doc(db, 'lists', id);

    try {
        await deleteDoc(ref);
    }
    catch (error) {
        console.error('Error deleting list:', error);
    }
};
