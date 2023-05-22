import styles from "./Background.module.css";
import clsx from "clsx";
function Background({ children }) {
  return (
    <div className={styles.background}>
      {children}
      <div className={styles.backgroundStart}></div>
      <div className={styles.backgroundMiddle}></div>
      <div className={styles.backgroundEnd}></div>
    </div>
  );
}
export default Background;
