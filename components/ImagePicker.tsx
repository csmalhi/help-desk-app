import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import * as ImagePickerComponent from 'expo-image-picker';
import { StyleSheet } from 'react-native';

interface ImagePickerProps {
  onImageSelected?: (uri: string | null) => void;
  shouldReset: boolean;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onImageSelected, shouldReset }) => {
  const [photoUri, setPhotoUri] = useState<string>('');

  const pickImage = async () => {
    const { status } = await ImagePickerComponent.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need permissions to access photos');
      return;
    }

    let result: ImagePickerComponent.ImagePickerResult = await ImagePickerComponent.launchImageLibraryAsync({
      mediaTypes: ImagePickerComponent.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      setPhotoUri(selectedImage.uri);
      if (onImageSelected) {
        onImageSelected(selectedImage.uri);
      }
    }
  };

  useEffect(() => {
    setPhotoUri('');
  }, [shouldReset]);

  return (
    <View>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text>Attach Photo</Text>
      </TouchableOpacity>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 5,
    marginTop: 20
  },
  image: {
    width: 50,
    height: 50,
    marginVertical: 10,
    borderRadius: 5
  }
});

