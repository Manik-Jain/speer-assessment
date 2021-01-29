import StatusCodes from 'http-status-codes'

let ok = (res, obj) => res.status(StatusCodes.OK).send(obj)
let created = (res, obj) => res.status(StatusCodes.CREATED).send(obj)
let notFound = (res, obj) => res.status(StatusCodes.NOT_FOUND).send(obj)
let badRequest = (res, obj) => res.status(StatusCodes.BAD_REQUEST).send(obj)

export {
    badRequest,
    ok,
    created,
    notFound
}