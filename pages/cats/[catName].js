import React from "react";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import styles from "../../styles/pages/catInfoPage.module.css";
import Rating from "../../components/UI/Rating";

const Cats = (props) => {
  const catInfo = props.post[0];

  return (
    <>
      <Head>
        <title>{catInfo.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <Layout>
        <section className={styles.catInfo}>
          <img
            src={catInfo.image.url}
            alt={catInfo.name}
            className={styles.mainCatImage}
          ></img>

          <div>
            <h1>{catInfo.name}</h1>
            <p>{catInfo.description}</p>

            <p>
              <strong>Temperament: </strong>
              {catInfo.temperament}
            </p>
            <p>
              <strong>Origin: </strong>
              {catInfo.origin}
            </p>
            <p>
              <strong>Life Span: </strong>
              {catInfo.life_span} years
            </p>

            <table>
              <tbody>
                <Rating name="Adaptability" degree={catInfo.adaptability} />
                <Rating
                  name="Affection level"
                  degree={catInfo.affection_level}
                />
                <Rating name="Child Friendly" degree={catInfo.child_friendly} />
                <Rating name="Grooming" degree={catInfo.grooming} />
                <Rating name="Intelligence" degree={catInfo.intelligence} />
                <Rating name="Health issues" degree={catInfo.health_issues} />
                <Rating name="Social needs" degree={catInfo.social_needs} />
                <Rating
                  name="Stranger friendly"
                  degree={catInfo.stranger_friendly}
                />
              </tbody>
            </table>
          </div>
        </section>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  const res = await fetch("https://api.thecatapi.com/v1/breeds");
  const cats = await res.json();

  // Get the paths we want to pre-render based on cats
  const paths = cats.map((cat) => ({
    params: { catName: cat.name },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps(context) {
  const res = await fetch(`https://api.thecatapi.com/v1/breeds`);
  const posts = await res.json();

  const catName = context.params.catName;

  const post = posts.filter((post) => post.name === catName);

  // Pass post data to the page via props
  return { props: { post } };
}

export default Cats;
