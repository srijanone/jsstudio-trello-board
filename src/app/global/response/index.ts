import Err from './errorcode';

const ResponseTemplate = {
  general(data: any) {
    return data;
  },
  successMessage(message: any) {
    return {
      success: true,
      message
    };
  },
  /**
   * Returns standard success response
   * @param {*} data
   * @param {String} message
   */
  success(data: any, message: any) {
    return {
      success: true,
      message,
      data
    };
  },
  error(message: any, err: any, code: any) {
    return {
      success: false,
      message: message || 'some error occurred',
      error: err || 'error occurred on server, please try again after some time.',
      code: code || Err.InternalServerError
    };
  },
  userNotFound() {
    return ResponseTemplate.error(
      'user not found',
      "the user you're looking for doesn't exist or you dont have permissions to access it.",
      Err.UserNotFound
    );
  }
}

export default ResponseTemplate;