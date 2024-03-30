import { NextFunction, Request, Response } from "express";
import IAuth from "../interfaces/authReqest.interface";
import AuthReqest from "../interfaces/authReqest.interface";

async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as AuthReqest).user
    if (user.role === 'admin') {
        next()
    } else {
        return res.status(404).send({
            message: 'Restricted to Admins only',
            success: false
        })
    }
}


export default isAdmin;