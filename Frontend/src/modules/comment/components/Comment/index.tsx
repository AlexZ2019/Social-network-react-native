import React, { useState } from 'react';
import { Card, View, Text, Flex, Icon } from '@ant-design/react-native';
import EditComment from '../EditComment';
import { CommentType } from '../../types';
import constants from '../../../user/constants';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DeleteComment from '../DeleteComment';

type Props = CommentType & {
  isEditable?: boolean,
}

const postStyle = {
  marginTop: 25,
  width: '96%',
  marginLeft: '2%',
  marginRight: '2%',
};

const headStyles = {
  padding: 15,
};

const Comment = ({
  media,
  text,
  id,
  isEditable,
  postId,
  name,
  email,
  nickname,
  userId,
}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const openProfile = (id: number) => {
    navigation.navigate(constants.profile, { id });
  };
  return (
    <>
      <Card style={postStyle}>
        <Flex justify="between" style={headStyles}>
          {isEditable &&
            <View>
              <Icon name="edit" onPress={() => setIsEdit(!isEdit)}/>
              <DeleteComment id={id}/>
            </View>
          }
        </Flex>
        <Card.Body>
          <View style={{ height: 42 }}>
            {isEdit ?
              <EditComment text={text} id={id} postId={postId}
                           setIsEdit={setIsEdit}/>
              : <>
                <Text onPress={() => openProfile(userId)}>{name || nickname ||
                  email}</Text>
                <Text style={{ marginLeft: 16 }}>{text}</Text>
              </>
            }
          </View>
        </Card.Body>
      </Card>
    </>
  );
};

export default Comment;
