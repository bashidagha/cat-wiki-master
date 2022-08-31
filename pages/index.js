import { child, get, ref } from "firebase/database";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import HomeAdapt from "../components/UI/HomeAdapt";
import LogoContainer from "../components/UI/LogoContainer";
import { database } from "../helper/uploadHelper";
import styles from "../styles/pages/Home.module.css";

export default function Home(props) {
  console.log(props.cats);

  return (
    <>
      <Head>
        <title>CatWiki</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <Layout>
        <section className={styles.home__hero}>
          <div className={styles.home__hero__search}>
            <LogoContainer />

            <p>Get to know more about your cat breed</p>
            <form>
              <input type="text" placeholder="Search"></input>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="48"
                viewBox="0 0 48 48"
              >
                <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" />
              </svg>
            </form>
          </div>

          <div className={styles.home__hero__mostsearch}>
            <p>Most Searched Breeds</p>
            <hr></hr>
            <div className={styles.home__hero__mostsearch_title}>
              <h4>66+ Breeds For you to discover</h4>
              <Link href="/most-search">
                <a className={styles.home__hero__mostsearch_seemore}>
                  SEA MORE <span>&#8594; </span>
                </a>
              </Link>
            </div>

            <div className={styles.home__hero__mostsearch__container_items}>
              {props.cats.map((cat) => (
                <Link href={`/cats/${cat.name}`}>
                  <a className={styles.home__hero__mostsearch__item}>
                    <img src={cat.image} alt={cat.name}></img>
                    <p>{cat.name}</p>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <HomeAdapt />
      </Layout>
    </>
  );
}

// This also gets called at build time
export async function getStaticProps(context) {
  const dbRef = ref(database);

  const p = await get(child(dbRef, `cats/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const convertObjectToArray = Object.values(snapshot.val()).slice(0, 4);

        return convertObjectToArray;

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
