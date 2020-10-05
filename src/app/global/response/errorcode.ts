/**
 * In UI error messages are translated based on these codes.
 * Follow error code format guidelines from the following doc before creating new error code.
 * doc: https://docs.google.com/document/d/1iZbWMUMqRgVq9bBsfuPfS3lF3RB33roHgSTC0L9oY0M
 */
const Err = {
  /* Authorization Errors */
  UserNotFound: 2000,
  /* Server Error */
  InternalServerError: 5000,
  DatabaseError: 5200,

  /* Undefined Code */
  UndefinedCode: 9999,
};
export default Err;