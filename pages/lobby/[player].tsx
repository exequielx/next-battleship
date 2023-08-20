import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";
import styles from '@/styles/lobby.module.css';
import Board from "@/components/board";

export default function Lobby() {
    const router = useRouter();
    const playerName = router?.query?.player;
    const game = useGame(playerName);

    const startGame = () => {
        router.push(`/game/${playerName}`);
    };

    return (
        <Layout title="LOBBY">
            <div>
                <div>
                    player: {playerName}
                </div>
                <div>
                    players:
                    <ul>
                        {
                            !game?.data ? <span>loading...</span> : (
                                game.data.users.map(r => <li key={r.id}>{r.name}</li>)
                            )
                        }
                    </ul>
                </div>
                <button onClick={game.randomizeShips}>Random</button>
                <button onClick={startGame}>Start Game</button>

                <Board size={game.boardSize} ships={game.getMyShips()} />

            </div>
        </Layout>
    );
}    