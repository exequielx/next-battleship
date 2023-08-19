import { useState, FormEvent } from "react";
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import styles from '@/styles/home.module.css';

export default function Home() {
   const router = useRouter()
   const [playerName, setPlayerName] = useState(String(Math.random()));

   const onChangeName = (event: FormEvent<HTMLInputElement>) => {
      setPlayerName(event.currentTarget.value);
   };

   const onLoginClick = () => {
      router.push(`/lobby/${playerName}`);
   };

   return (
      <Layout title="Login">
         <div className={styles.container}>
            <h1 style={{ textAlign: 'center' }}>Batalla Naval</h1>
            <div>
               <input
                  type="text"
                  placeholder="Player"
                  value={playerName}
                  onChange={onChangeName}
                  className={styles.textInputField}
               />
               <button onClick={onLoginClick}>Login</button>
            </div>
         </div>
      </Layout>
   );
}    