import { getUsers } from '@/lib/users';
import type { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const users = getUsers();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).end();
    }
}

export default handler;
