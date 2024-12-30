import * as ImagePicker from "expo-image-picker";

const useImagePicker = () => {
  const pickImageAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      return pickerResult.assets[0].uri;
    } else {
      return;
    }
  };

  return {
    pickImageAsync,
  };
};

export default useImagePicker;
