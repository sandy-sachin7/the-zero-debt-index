import { db } from './firebase';
import { collection, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { Template } from '../types/template';

export type { Template };

export const getTemplates = async (): Promise<Template[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'templates'));
    return querySnapshot.docs.map(doc => doc.data() as Template);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
};

export const getTemplateById = async (id: string): Promise<Template | undefined> => {
  try {
    const docRef = doc(db, 'templates', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Template;
    }
    return undefined;
  } catch (error) {
    console.error('Error fetching template:', error);
    return undefined;
  }
};

