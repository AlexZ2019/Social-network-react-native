import { View } from 'react-native';
import { Button, Modal } from '@ant-design/react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { FC } from 'react';
import { useMutation } from '@apollo/client';
import useModal from '../../hooks/useModal';
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';

type Props = {
  mutation: any;
  uploadBtnText: string;
}

const UploadImage: FC<Props> = ({ mutation, uploadBtnText }) => {
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const [upload, { loading, data }] = useMutation(mutation);
  const modal = useModal();
  
  const handleChoosePhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: [4, 3],
        quality: 1,
      });
      setUploadedImage(result.assets[0].uri);
    } catch (err) {
      setUploadedImage(null);
      return false;
    }
  };
  
  const uploadImage = () => {
    const file = new ReactNativeFile({
      uri: uploadedImage,
      name: `picture-${Date.now()}`,
      type: mime.lookup(uploadedImage),
    });
    upload({ variables: { image: file } });
  };
  
  return (
    <View>
      <Button onPress={modal.showModal}>{uploadBtnText}</Button>
      <Modal
        transparent={false}
        visible={modal.isVisible}
        animationType="slide-up"
        onClose={modal.hideModal}>
        <Button onPress={handleChoosePhoto}>Choose image</Button>
        <Button type="primary" loading={loading} disabled={!uploadedImage}
                onPress={uploadImage}>
          Upload
        </Button>
      </Modal>
    </View>
  );
};

export default UploadImage;
