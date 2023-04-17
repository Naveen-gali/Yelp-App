import AsyncStorage from '@react-native-async-storage/async-storage';

const getItemsFromAsyncStorage = async (key: string): Promise<any | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data != null) {
      return JSON.parse(data);
    }
  } catch {
    return null;
  }
};

export {getItemsFromAsyncStorage};
