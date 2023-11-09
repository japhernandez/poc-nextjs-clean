export class ServerErrorImpl extends Error {
    constructor () {
        super('Internal Server Error')
        this.name = 'ServerErrorImpl'
    }
}