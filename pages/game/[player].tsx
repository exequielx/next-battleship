import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";
import Board from "@/components/board";

export default function Lobby() {
    const router = useRouter();
    const playerName = router?.query?.player;
    const game = useGame(playerName);

    return (
        <Layout title="GAME">
            <div>
                <div>
                    players:
                    <ul>
                        {game.users.map(r => <li key={r.id}>{r.name}</li>)}
                    </ul>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Board cellSize={23} size={10} ships={game.ships} />
                    <Board size={10} ships={game.myShips} />
                </div>
            </div>
        </Layout>
    );
}    