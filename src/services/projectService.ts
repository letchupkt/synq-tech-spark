
import { db } from '@/config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
}

const COLLECTION_NAME = 'projects';

export const getProjects = async (): Promise<Project[]> => {
  const projectCollection = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(projectCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Project[];
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), project);
  return docRef.id;
};

export const updateProject = async (id: string, project: Partial<Omit<Project, 'id'>>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, project);
};

export const deleteProject = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

export const initializeProjects = async (projects: Omit<Project, 'id'>[]): Promise<void> => {
  const projectCollection = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(projectCollection);
  
  if (snapshot.empty && projects.length > 0) {
    // Only initialize if collection is empty
    const promises = projects.map(project => addDoc(collection(db, COLLECTION_NAME), project));
    await Promise.all(promises);
  }
};
