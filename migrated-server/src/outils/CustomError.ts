
class CustomError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'CustomError';
        this.status = status;
    }
}

module.exports = CustomError;