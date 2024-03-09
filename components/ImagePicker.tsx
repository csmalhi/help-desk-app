import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import * as ImagePickerComponent from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

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
      <Button mode="contained-tonal" onPress={pickImage} style={styles.button}>
        Attach Photo
      </Button>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  button: {
    marginTop: 20
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 5
  }
});

