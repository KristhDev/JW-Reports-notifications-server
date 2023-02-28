import { NextFunction, Request, Response } from 'express';

export const authCheck = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(404).json({
            message: 'Page not found',
            status: 400
        });
    }

    const token = auth.split(' ')[1];

    if (!token) {
        return res.status(404).json({
            message: 'Page not found',
            status: 400
        });
    }

    const envToken = process.env.ACCESS_TOKEN;

    if (!envToken || envToken !== token) {
        return res.status(404).json({
            message: 'Page not found',
            status: 400
        });
    }

    next();
}