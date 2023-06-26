import React, { useState } from 'react';
import { Card, View, Text, Flex, Icon } from '@ant-design/react-native';
import DeletePost from '../DeletePost';
import EditPost from '../EditPost';
import Comments from '../../../comment/components/Comments';

type Props = {
  id: number;
  text: string;
  name: string | null;
  nickname: string | null;
  media: string;
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

const Post = ({ media, text, id, isEditable, name, nickname }: Props) => {
  const [commentsShow, setCommentsShow] = useState<boolean>(false);
  return (
    <>
      <Card style={postStyle}>
        <Flex justify="between" style={headStyles}>
          <View>
            {name || nickname || 'Post'}
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
