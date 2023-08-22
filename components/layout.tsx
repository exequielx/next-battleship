import Head from 'next/head';

export default function Layout({ children, title }: { title: string, children: JSX.Element }) {
  return (
    <>
      <Head>
        <title>Next BattleShip</title>
      </Head>
      <div style={{ display: 'flex', justifyContent: 'center', color: '#a2b6ff' }}>
        <h1>{title}</h1>
      </div>
      <main>
        {children}
      </main>
    </>
  );
}
