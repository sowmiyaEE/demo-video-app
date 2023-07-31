module.exports = {
  ERROR_CODES: {
    SOMETHING_WENT_WRONG: 400,
    VALIDATION_ERROR: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403
  },
  CODES:{
    SUCCESS: 200
  },
  MESSAGES: {
    USERS: {
      USER_CREATE_SUCCESS: 'Registration completed successfully.',
      EMAIL_NOT_FOUND: 'This email is not found.',
      EMAIL_ALREADY_EXISTS: 'Email Id already exists.',
      PHONE_NO_EXISTS: 'Phone number already exists.',
      INCORRECT_PASSWORD: 'Incorrect password',
      USER_CREATE_FAIL: 'Cannot create user at this point, try later.',
      UPDATE_USER_SUCCESS: 'Updated user successfully.',
      UPDATE_USER_FAIL: 'Cannot update user at this point, try later.',
      LOGIN_SUCCESSFUL: 'User loggedin successfully.',
      USER_FOUND: 'Found user.',
      USER_NOT_FOUND: 'User not found.',
    },
    ROLES: {},
    PLANS: {
      PLAN_CREATED: 'Created plan successfully.',
      PLAN_NOT_CREATED: 'Failed to create plan',
      PLAN_UPDATED: 'Updated successfully.',
      PLAN_NOT_FOUND: 'Cannot find plan.',
      DUPLICATE_ENTRY: 'Plan name already exists.',
      PLAN_NOT_UPDATED: 'Failed to update.',
      PLANS_FETECHED: 'Plans fetched successfully',
      PLAN_DELETED: 'Deleted plan successfully.'
    },
    SUBSCRIPTION:{
      SUBSCRIPTION_CREATED: 'User has been subscribed successfully.',
      FAILED_TO_CREATE_SUBBSCRIPTION: 'User cannot proceed with this subscription.'
    },
    UPLOAD: {
      UPLOAD_COMPLETE: 'Upload complete.',
      UPLOAD_FAILED: 'Upload failed.'
    },
    SOMETHING_WENT_WRONG: 'Error.',
    VALIDATION_ERROR: "Validation failed",
    SUCCESS: "Fetched successfully",
    UNAUTHORISED:"unauthorised"
  },
  ROLES:{
    SYSTEM:"SYSTEM",
    USER:"PUBLIC-USER"
  }
};
