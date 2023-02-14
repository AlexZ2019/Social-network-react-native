import * as bcrypt from 'bcrypt';

const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export default comparePassword;
