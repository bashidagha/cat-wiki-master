import React, { useEffect } from "react";
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
            src={catInfo.image ? catInfo.image.url : props.OtherPhotos[0].url}
            alt={catInfo.name}
            className={styles.mainCatImage}
          ></img>

          <div className={styles.catInfo__desc}>
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

        <div className={styles.catOtherPhoto}>
          <h3>Other photos</h3>

          <div>
            {props.OtherPhotos.map((photo) => (
              <img src={photo.url} alt={catInfo.name} key={photo.id}></img>
            ))}
          </div>
        </div>
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
  //fetch breeds
  const res = await fetch(`https://api.thecatapi.com/v1/breeds`);
  const posts = await res.json();

  const catName = context.params.catName;

  const post = posts.filter((post) => post.name === catName);

  //fetch breed other photos
  const resOtherPhotos = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${post[0].id}&limit=8`
  );
  const OtherPhotos = await resOtherPhotos.json();

  // Pass post data to the page via props
  return { props: { post, OtherPhotos } };
}

export default Cats;
