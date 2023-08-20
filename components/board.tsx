import { Cell as cCell, boardSize } from '@/lib/types';
import Cell from './cell';

export default function Board({ cellSize = 40, cells, onCellClick = () => { } }: { cellSize?: number, cells?: cCell[], onCellClick?: any }) {
    const board = Array(boardSize).fill('').map(r => Array(boardSize).fill(''));
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const drawCell = (x: number, y: number) => {
        let ret: any = <Cell x={x} y={y} onCellClick={onCellClick} />;
        if (cells) {
            cells.forEach(cell => {
                if (cell.x === x && cell.y === y) {
                    ret = <Cell {...cell} onCellClick={onCellClick} />
                }
            });
        }
        return ret;
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <table style={{ borderSpacing: 0 }}>
                <tbody>
                    {
                        board.map((r, x) => (
                            <tr key={x} style={{ borderCollapse: 'collapse', border: '1px solid white' }}>
                                {
                                    <td key={x} style={{ width: cellSize, height: cellSize }} >
                                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{letters[x]}</span>

                                    </td>
                                }
                                {
                                    r.map((c, y) => (
                                        <td key={x + y} style={{ borderCollapse: 'collapse', border: '1px solid white', width: cellSize, height: cellSize }} >
                                            {drawCell(x, y)}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    <tr>
                        <td></td>
                        {
                            board[0].map((v, index) => (
                                <td key={index} style={{ width: cellSize, height: cellSize }}>
                                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{index}</span>
                                </td>
                            ))
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    );
}