import React, { useState } from 'react';
import { Card, View, Text, Flex, Icon } from '@ant-design/react-native';
import DeletePost from '../DeletePost';
import EditPost from '../EditPost';
import Comments from '../../../comment/components/Comments';
import constants from '../../../user/constants';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PostType } from '../../types';

type Props = PostType & {
  isEditable?: boolean;
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

const Post = ({
  media,
  text,
  id,
  isEditable,
  name,
  nickname,
  userId,
  email,
}: Props) => {
  const [commentsShow, setCommentsShow] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const openProfile = (id: number | undefined) => {
    navigation.navigate(constants.profile, { id });
  };
  
  return (
    <>
      <Card style={postStyle}>
        <Flex justify="between" style={headStyles}>
          <View onPress={() => openProfile(userId)}>
            {name || nickname || email || 'Post'}
          </View>
          {isEditable &&
            <View>
              <EditPost text={text} id={id}/>
              <DeletePost id={id}/>
            </View>
          }
        </Flex>
        <Card.Body>
          <View style={{ height: 42 }}>
            <Text style={{ marginLeft: 16 }}>{text}</Text>
          </View>
        </Card.Body>
        <Icon name="message" onPress={() => setCommentsShow(!commentsShow)}/>
      </Card>
      {commentsShow && <Comments postId={id}/>}
    </>
  
  );
};

export default Post;
