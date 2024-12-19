
class CustomError extends Error {
    constructor(message: string, status: number) {
        super(message)
        this.name = 'CustomError'; 
        this.status = status; 
    }
}


module.exports = CustomError  