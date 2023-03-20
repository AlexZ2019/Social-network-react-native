import gql from 'graphql-tag';

export const REGISTER_MUTATION = gql`
    mutation createUser($email: String!, $password: String!, $sex: String, $firstname: String, $lastname: String, $nickname: String, $biography: String, $birthday: String, $status: String) {
        createUser(email: $email, password: $password, sex: $sex, firstname: $firstname, lastname: $lastname, nickname: $nickname, biography: $biography, status: $status, birthday: $birthday)
    }
`;
