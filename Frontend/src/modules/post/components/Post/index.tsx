import React from 'react';
import { Card, View, Text, Flex } from '@ant-design/react-native';
import DeletePost from '../DeletePost';
import EditPost from '../EditPost';

type Props = {
  id: number;
  text: string;
  firstname?: string;
  lastname?: string;
  media: string;
  isEditable?: boolean
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

const Post = ({ media, text, id, isEditable }: Props) => {
  
  return (
    <Card style={postStyle}>
      <Flex justify="between" style={headStyles}>
        <View>
          Post
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
      <Card.Footer
        content="footer content"
        extra="footer extra content"
      />
    </Card>
  );
};

export default Post;
