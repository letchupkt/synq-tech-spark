
import { db } from '@/config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  setDoc 
} from 'firebase/firestore';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  social: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
}

const COLLECTION_NAME = 'teamMembers';

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const teamCollection = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(teamCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as TeamMember[];
};

export const addTeamMember = async (teamMember: Omit<TeamMember, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), teamMember);
  return docRef.id;
};

export const updateTeamMember = async (id: string, teamMember: Partial<Omit<TeamMember, 'id'>>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, teamMember);
};

export const deleteTeamMember = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

export const initializeTeamMembers = async (teamMembers: Omit<TeamMember, 'id'>[]): Promise<void> => {
  const teamCollection = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(teamCollection);
  
  if (snapshot.empty && teamMembers.length > 0) {
    // Only initialize if collection is empty
    const promises = teamMembers.map(member => addDoc(collection(db, COLLECTION_NAME), member));
    await Promise.all(promises);
  }
};
