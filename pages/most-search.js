import { child, get, ref } from "firebase/database";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout/Layout";
import { database } from "../helper/uploadHelper";
import styles from "../styles/pages/mostsearchcats.module.css";

const MostSearchedCats = (props) => {
  return (
    <>
      <Head>
        <title>Most Searched Cats</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <Layout>
        <h1 className={styles.title}>Top 10 most searched breeds</h1>

        {props.cats &&
          props.cats.map((cat, index) => (
            <div className={styles.most__catItem} key={index + 1}>
              <img src={cat.image} alt={cat.name}></img>
              <div>
                <Link href={`/cats/${cat.name}`}>
                  <a>
                    <h3>
                      {index + 1}. {cat.name}
                    </h3>
                  </a>
                </Link>

                <p>{cat.description}</p>
              </div>
            </div>
          ))}
      </Layout>
    </>
  );
};

// This also gets called at build time
export async function getStaticProps(context) {
  const dbRef = ref(database);

  const p = await get(child(dbRef, `cats/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());

        const convertObjectToArray = Object.values(snapshot.val());

        return convertObjectToArray;
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
