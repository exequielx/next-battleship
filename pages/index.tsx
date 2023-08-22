import { useState, FormEvent } from "react";
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import styles from '@/styles/login.module.css';

export default function Login() {
   const router = useRouter()
   const [playerName, setPlayerName] = useState<string | null>(null);

   const onChangeName = (event: FormEvent<HTMLInputElement>) => {
      setPlayerName(event.currentTarget.value ?? '');
   };

   const onLoginClick = () => {
      if (playerName) {
         router.push(`/lobby/${playerName}`);
      }
   };

   return (
      <Layout title="Login">
         <div className={styles.container}>
            <div className={styles.content}>
               <input
                  type="text"
                  placeholder="Nombre"
                  value={playerName ?? ''}
                  onChange={onChangeName}
                  className={styles.textInputField}
               />
               <button disabled={!playerName} onClick={onLoginClick}>Login</button>
            </div>
         </div>
      </Layout>
   );
}    