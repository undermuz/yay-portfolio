export class HttpRequestException extends Error {
    public response: Response

    constructor(response: Response, text: string) {
        super(text)

        this.response = response
    }
}
