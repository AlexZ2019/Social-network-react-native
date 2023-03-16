type error = {
  errorTitle: string
  errorDescription: string
}

export type GqlErrors = {
  [key: string]: error
}

export const gqlErrors: GqlErrors = {
  'Invalid Credentials': {
    errorTitle: 'email or password is incorrect',
    errorDescription: 'Please, enter correct email and password and try again',
  },
  'This city has already been added': {
    errorTitle: 'This city has already been added',
    errorDescription: 'You can\'t add the same city twice',
  },
  'You can\'t add more than 10 cards': {
    errorTitle: 'You can\'t add more than 10 cards',
    errorDescription: '',
  },
  'Network error': {
    errorTitle: 'Connection is failed',
    errorDescription: '',
  },
};
