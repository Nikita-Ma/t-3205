import {pool as db} from '../config/db'
import {Request, Response} from "express";

interface UserInterface {
    email: string,
    number: string
}


// * @desc Fetch create a new post
// * @route GET find-user?number=QUERY&email=QUERY
// * @access Public
export const getUser = async (req: Request<{}, {}, {}, UserInterface>, res: Response): Promise<void> => {
    // some RegEx
    const regexNumber = /^[0-9-]+$/;
    const regexEmail = /^\S+@\S+\.\S+$/;
    setTimeout(async () => {
        console.log(req.query.number.split('').filter((item) => item !== '-').join(''))
        // guard
        if (regexNumber.test(req.query.number) && regexEmail.test(req.query.email) && req.query.number.split("").filter((item) => item !== "-").length === 6) {

            const resDB = await db.query('SELECT * FROM users WHERE email = $1 AND number = $2', [req.query.email, req.query.number.split('').filter((item) => item !== '-').join('')])
            if (!resDB.rows.length) {
                res.sendStatus(404)
                return Promise.resolve()
            }
            res.json(resDB.rows)
            return Promise.resolve()
        }
        if (regexEmail.test(req.query.email)) {
            const resDB = await db.query('SELECT * FROM users WHERE email = $1', [req.query.email])
            if (!resDB.rows.length) {
                res.sendStatus(404)
                return Promise.resolve()
            }
            res.json(resDB.rows)
            return Promise.resolve()
        }
        res.sendStatus(422)
        return Promise.resolve()

    }, 5000)

}
