import { View } from 'react-native';
import { Button, Modal } from '@ant-design/react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { FC } from 'react';
import useModal from '../../hooks/useModal';
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';
import {
  fileExtensionValidation,
  fileSizeValidation,
} from '../../helpers/fileValidation';

type Props = {
  upload: (p: { variables: { image: ReactNativeFile } }) => void;
  loading: boolean
  uploadBtnText: string;
}

const MAX_SIZE_TEXT = '3MB';
const MAX_SIZE_BYTES = 3e+6;

const UploadImage: FC<Props> = ({ upload, loading, uploadBtnText }) => {
  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);
  const modal = useModal();
  
  const handleChoosePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('You\'ve refused to allow this app to access your media!');
        return;
      }
      const { assets } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        allowsMultipleSelection: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (assets && !fileExtensionValidation(assets[0].uri, ['jpg', 'jpeg'])) {
        throw new Error('Only jpg and jpeg extensions are allowed');
      }
      if (assets && !await fileSizeValidation(assets[0].uri, MAX_SIZE_BYTES)) {
        throw new Error(`File size can not be bigger then ${MAX_SIZE_TEXT}`);
      }
      setUploadedImage(assets[0].uri);
    } catch (err) {
      setUploadedImage(null);
      return false;
    }
  };
  
  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert('You\'ve refused to allow this app to access your camera!');
        return;
      }
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setUploadedImage(result.uri);
      }
    } catch (e) {
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
    setUploadedImage(null);
    modal.hideModal();
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
        <Button onPress={takePhoto}>Take a photo</Button>
        <Button type="primary" loading={loading} disabled={!uploadedImage}
                onPress={uploadImage}>
          Upload
        </Button>
      </Modal>
    </View>
  );
};

export default UploadImage;
