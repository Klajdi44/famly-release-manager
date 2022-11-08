import Link from 'next/link';
import styles from "../app/page.module.css";

export default function FirstPost() {
  return (
    <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>Team:</h1>
      <h3 className={styles.description}>Jonas, Klajdi and Andrei</h3>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>

      </main>
      </div>
  );
}
