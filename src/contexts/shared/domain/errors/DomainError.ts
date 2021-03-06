/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum DomainErrorTypes {
  NotFound = 'NOT_FOUND',
  NotAcceptable = 'NOT_ACCEPTABLE',
}

abstract class DomainError extends Error {
  abstract errorType: DomainErrorTypes;
}

export default DomainError;
