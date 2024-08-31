import { Title } from "#build/components";
import { collection, getDocs ,addDoc , deleteDoc, doc } from "firebase/firestore"; 
import type { People } from "~/interfaces/people.type";

export const usePeopleFireStore = () => {
    const {$db} = useNuxtApp();

    const peoples = useState('counter', ()=> [] as People[])

    const getPeople = async() => {
        try {
            const querySnapshot = await getDocs(collection($db, "people"));
            
            peoples.value = querySnapshot.docs.map((doc) => {
                return {id: doc.id, ...doc.data()} as People;
            });
        } catch (error) {
            console.log(error);
        }
    };

    const postPeople = async(people : {
        name: string,
        title: string,
        role: string,
        email : string
    }) =>{
        try {
            const docRef = await addDoc(collection($db, "people"), people);

            peoples.value = [...peoples.value, {id:docRef.id, ...people}];
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const deletePeople = async(id: string) => {
        try {
            await deleteDoc(doc($db, "people",id));
            peoples.value = peoples.value.filter((people) => people.id !== id);
        } catch (error) {
            console.log(error);
            
        }
    }

    

    return {
        getPeople,
        postPeople,
        peoples,
        deletePeople
    };
};