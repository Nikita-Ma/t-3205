import {NextFunction, Request, Response} from "express";


export const notFound = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const error = new Error(`Not Found -  ${req.originalUrl}`)
    res.status(404)
    next(error)
    return Promise.resolve()
}
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Promise<void> => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        massage: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
    return Promise.resolve()
}