import React from 'react';
import { Card, View, Text } from '@ant-design/react-native';

type Props = {
  text: string;
  firstname?: string;
  lastname?: string;
  media: string;
}
const Post = ({ media, text }: Props) => {
  
  return (
    <Card>
      <Card.Header
        title="Post"
        thumbStyle={{ width: 30, height: 30 }}
        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
      />
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
