import { useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const [text, setText] = useState<string>();
  const inputHandler = (e: { target: { value: string } }) => {
    setText(e.target.value);
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <input type="text" onChange={inputHandler} />
        {text?.trim() && (
          <Link href={`https://twitter.com/intent/tweet?text=This_is_test1&url=${baseUrl}/${encodeURIComponent(text)}`}>
            OGPtest
          </Link>
        )}
      </main>
    </div>
  );
};
export default Home;
