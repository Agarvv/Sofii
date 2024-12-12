
class CustomError extends Error {
    constructor(msg, status) {
        super(message)
        this.name = 'CustomError'; 
        this.status = status; 
    }
}


module.exports = CustomError 