export default class CustomError {
    static createCustomError({ name, message }: { name: string, message: string }): any {
        const newError: Error  = new Error(message)
        newError.name = name
        throw newError
    }
}