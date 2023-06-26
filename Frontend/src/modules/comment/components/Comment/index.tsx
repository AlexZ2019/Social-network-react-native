import React, { useState } from 'react';
import { Card, View, Text, Flex, Icon } from '@ant-design/react-native';
import DeletePost from '../DeleteComment';
import EditComment from '../EditComment';

type Props = {
  id: number;
  postId: number;
  text: string;
  name: string | null;
  media: string;
  isEditable?: boolean,
  nickname: string | null
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
  nickname,
}: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  
  return (
    <>
      <Card style={postStyle}>
        <Flex justify="between" style={headStyles}>
          {isEditable &&
            <View>
              <Icon name="edit" onPress={() => setIsEdit(!isEdit)}/>
              <DeletePost id={id}/>
            </View>
          }
        </Flex>
        <Card.Body>
          <View style={{ height: 42 }}>
            {isEdit ?
              <EditComment text={text} id={id} postId={postId}
                           setIsEdit={setIsEdit}/>
              : <>
                <Text>{name || nickname}</Text>
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
