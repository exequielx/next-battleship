import Head from 'next/head';

export default function Layout({ children}: {children: JSX.Element}) {
    return (
        <>
           <Head>
             <title>Next BattleShip</title>
           </Head>
           <main>
              {children}
           </main>   
        </>
    );
}


