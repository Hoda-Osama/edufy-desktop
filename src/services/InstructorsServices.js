import { db } from '../firebase';
import {
    collection,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    doc,
    arrayUnion
} from 'firebase/firestore'

const instructorsCollectionRef = collection(db, 'instructors');
class InstructorsServices {
    getAllInstructors() {
        return getDocs(instructorsCollectionRef);
    }

    getInstructor(id) {
        const instructorDoc = doc(db, "instructors", id);
        return getDoc(instructorDoc);
    }

    addInstructor(id) {
        const instructorDoc = doc(db, "instructors", id);
        return setDoc(instructorDoc, { meetings: [] });
    }

    updateInstructorMeetingData(id, updatedInstructorMeetingData) {
        console.log(updatedInstructorMeetingData);
        const instructorDoc = doc(db, "instructors", id);
        return updateDoc(instructorDoc, {
            meetings: arrayUnion(updatedInstructorMeetingData)
        });
        // const instructorDoc = doc(db, "instructors", id);
    }

}

export default new InstructorsServices();