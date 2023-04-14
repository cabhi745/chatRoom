import { NextFunction, Request, Response } from "express";
import { paths } from "./constant";

// callback function thats executed after auth
// usually just done is used in OAUTH
export function verifyCallback (accessToken: string, refreshToken: string, profile: any, done: any){
    done(null, profile)
}

export function isLoggedIn (req: Request, res: Response, next: NextFunction) {
    const isLoggedIn  = req.isAuthenticated() && req.user
    console.log(req.isAuthenticated(), req.user)
    if(!isLoggedIn) {
        return res.redirect(paths.AUTH_GOOGLE)
    }
    next()
}

// serialize is used to allow passport to take data and put in cookies.
// return value in done is just user id as we just need that to verify if user is logged in or not. 
export function serializeMiddleware (user: any, done: (err: any, id?: unknown) => void) {
    console.log(`User logged in with UserId: ${user.id}`)
    done(null, user.id)
}

// deserialize is used to allow passport to get data from cookies.
// any validation for server side sessions can be done here ===
export function deserializeMiddleware (user: any, done: (err: any, id?: unknown) => void) {
    done(null, user)
}