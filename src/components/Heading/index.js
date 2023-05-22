import clsx from "clsx";
import styles from "./Heading.module.scss";
function Heading() {
  return (
    <div className={styles.heading}>
      <ul className={styles.dateList}>
        <li className={styles.dateItem}>
            <a>
            Day
            </a>
        </li>
        <li className={styles.dateItem}>
            <a>
            Week
            </a>
        </li>
        <li className={styles.dateItem}>
            <a>
            Month
            </a>
        </li>
        <li className={styles.dateItem}>
            <a>
            Year
            </a>
        </li>
      </ul>
      <div>
        <h1>TODO LIST</h1>
      </div>
    </div>
  );
}
export default Heading;
