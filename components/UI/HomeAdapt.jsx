import Link from "next/link";
import React from "react";
import styles from "./homeadapt.module.css";

const HomeAdapt = () => {
  return (
    <section className={styles.home__adapt}>
      <div className={styles.home__adapt__info}>
        <hr></hr>
        <h2>Why should you have a cat?</h2>
        <p>
          Having a cat around you can actually trigger the release of calming
          chemicals in your body which lower your stress and anxiety leves
        </p>

        <a href="https://animalkind.org/blog/top-5-reasons-cat/">
          READ MORE <span>&#8594; </span>{" "}
        </a>
      </div>

      <div className={styles.home__gallery}>
        <div>
          <img src="/image 2.png" alt="image"></img>

          <img src="/image 1.png" alt="image"></img>
        </div>
        <img
          src="/image 3.png"
          alt="image"
          className={styles.home__gallery__single}
        ></img>
      </div>
    </section>
  );
};

export default HomeAdapt;
