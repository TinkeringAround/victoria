export type TResponse = {
    type: TResponseCode
    errors: Array<string>
    data: any
}

export enum TResponseCode {
    LOGIN_OK,
    LOGIN_ERROR,

    REGISTRATION_OK,
    REGISTRATION_ERROR,

    DATABASE_OK,
    DATABASE_ERROR
}
