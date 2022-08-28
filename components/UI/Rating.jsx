import React from "react";
import styles from "../../styles/pages/catInfoPage.module.css";

const Rating = (props) => {
  const fill = Array(props.degree)
    .fill()
    .map((_, index) => index + 1);

  const empty = Array(5 - props.degree)
    .fill()
    .map((_, index) => index + 1);

  return (
    <tr className={styles.catRateItem}>
      <th>
        <p>{props.name}:</p>
      </th>

      <th>
        {fill.length > 0 &&
          fill.map((f) => {
            return <div className={styles.catRateItem__fill}></div>;
          })}
        {empty.length > 0 &&
          empty.map((f) => {
            return <div className={styles.catRateItem__empty}></div>;
          })}
      </th>
    </tr>
  );
};

export default Rating;
