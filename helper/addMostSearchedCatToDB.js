import { push, ref, set } from "firebase/database";
import { database } from "./uploadHelper";

export default function addMostSearchedCatToDB(cat) {
  const catListRef = ref(database, "cats/");
  const newCatRef = push(catListRef);
  set(newCatRef, {
    id: cat.id,
    name: cat.name,
    image: cat.image.url,
    description: cat.description,
  })
    .then(() => {
      // Data saved successfully!
      return true;
    })
    .catch((error) => {
      // The write failed...
      return false;
    });
}
