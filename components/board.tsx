import { Ship } from '@/lib/types';
import Cell from './cell';

export default function Board({ size, cellSize = 40, ships }: { size: number, cellSize?: number, ships?: Ship[] }) {
    const board = Array(size).fill('').map(r => Array(size).fill(''));
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

    const drawCell = (x: number, y: number) => {
        let ret: any = <Cell />;
        if (ships) {
            ships.forEach(ship => {
                ship.coordinates.forEach(shipPart => {
                    if (shipPart.x === x && shipPart.y === y) {
                        ret = <Cell id={`${shipPart.x}${shipPart.y}`} color={ship?.color} exploded={shipPart?.exploded} />
                    }
                });
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