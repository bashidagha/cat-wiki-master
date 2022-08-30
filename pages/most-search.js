import { child, get, ref } from "firebase/database";
import React from "react";
import { database } from "../helper/uploadHelper";

const MostSearchedCats = (props) => {
  console.log(props.cats);

  return <></>;
};

// This also gets called at build time
export async function getStaticProps(context) {
  const dbRef = ref(database);

  const p = await get(child(dbRef, `cats/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No most searched cats available");
        return null;
      }
    })
    .catch((error) => {
      console.error(error);
    });

  // Pass post data to the page via props
  return { props: { cats: p } };
}

export default MostSearchedCats;
