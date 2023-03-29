import gql from 'graphql-tag';

export const EDIT_USER_MUTATION = gql`
    mutation EditUser($biography: String, $birthday: String, $firstname: String, $lastname: String, $nickname: String, $sex: String, $status: String){
        editUser(biography: $biography, birthday: $birthday, firstname: $firstname, lastname: $lastname, nickname: $nickname, sex: $sex, status: $status)
    }
`;
