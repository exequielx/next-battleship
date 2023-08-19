import Head from 'next/head';

export default function Layout({ children, title}: {title: string, children: JSX.Element}) {
    return (
        <>
           <Head>
             <title>Next BattleShip</title>
           </Head>
           <h1>{title}</h1>
           <main>
              {children}
           </main>   
        </>
    );
}
