
import { db } from '@/config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  increment
} from 'firebase/firestore';

export interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  date: string;
  likes: number;
  status: 'approved' | 'pending' | 'rejected';
}

const COLLECTION_NAME = 'comments';

export const getComments = async (): Promise<Comment[]> => {
  const commentCollection = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(commentCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Comment[];
};

export const getApprovedComments = async (): Promise<Comment[]> => {
  const commentCollection = collection(db, COLLECTION_NAME);
  const q = query(commentCollection, where("status", "==", "approved"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Comment[];
};

export const addComment = async (comment: Omit<Comment, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), comment);
  return docRef.id;
};

export const updateComment = async (id: string, comment: Partial<Omit<Comment, 'id'>>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, comment);
};

export const updateCommentStatus = async (id: string, status: 'approved' | 'pending' | 'rejected'): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { status });
};

export const incrementLikes = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { 
    likes: increment(1) 
  });
};

export const deleteComment = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};

export const initializeComments = async (comments: Omit<Comment, 'id'>[]): Promise<void> => {
  const commentCollection = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(commentCollection);
  
  if (snapshot.empty && comments.length > 0) {
    // Only initialize if collection is empty
    const promises = comments.map(comment => addDoc(collection(db, COLLECTION_NAME), comment));
    await Promise.all(promises);
  }
};
