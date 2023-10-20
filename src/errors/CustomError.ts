import httpStatus from "http-status";

export class CustomError extends Error {
    errorCode?: number;
    reasonCode: string;
    rootErr?: Error;

    constructor(message: string, errorCode?: number, reasonCode?: string, rootErr?: Error){
        super();

        this.message = message;

        if(this.errorCode) {
            this.errorCode = errorCode;
        } else {
            this.errorCode = httpStatus.BAD_REQUEST;
        }

        this.errorCode = errorCode;
        this.reasonCode = reasonCode;
        this.rootErr = rootErr;
    }
}