import {pool} from "../config/db"

export function connectDB(): void {
    pool
        .connect()
        .then(() => console.log('\x1b[32m' +' [DATABASE] Connected' + '\x1b[0m'))
        .catch((err: Error) =>
            console.error('connection error', err.stack)
        )
}
