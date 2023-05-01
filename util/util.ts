import _ from "lodash";
import { Request } from "express";


export function isUserLoggedIn (req: Request): boolean {
    return req.isAuthenticated() && !_.isEmpty(req.user)
}