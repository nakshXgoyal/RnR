import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const guideRequestsCollection = collection(db, "guideRequests");
const guidesCollection = collection(db, "guides");

export const submitGuideRequest = async (request) => {
  await addDoc(guideRequestsCollection, {
    ...request,
    requestDate: new Date().toISOString()
  });
};

export const addGuide = async (guide) => {
  await addDoc(guidesCollection, guide);
};

export const fetchGuides = async () => {
  const snapshot = await getDocs(guidesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};