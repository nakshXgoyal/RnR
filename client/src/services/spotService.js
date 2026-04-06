import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const spotsCollection = collection(db, "touristSpots");

export const fetchSpots = async () => {
  const snapshot = await getDocs(spotsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addSpot = async (spot) => {
  await addDoc(spotsCollection, spot);
};
