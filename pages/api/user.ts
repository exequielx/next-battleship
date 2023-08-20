// import { getUserByName } from '@/lib/game';
import type { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
    // try {
    //     const user = getUserByName(String(req.query.name)) ?? null;
    //     console.log(user)
    //     res.status(200).json(user);
    // } catch (err) {
    //     res.status(500).end();
    // }
}

export default handler;
