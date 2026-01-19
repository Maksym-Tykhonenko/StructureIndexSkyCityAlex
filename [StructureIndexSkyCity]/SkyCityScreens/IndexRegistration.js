import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const bgImg = require('../assets/images/background.png');
const primaryGradient = ['#5B421E', '#FFCE88'];
const textFFF = '#ffffffff';
const secondaryDark = '#171717';

const IndexRegistration = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const { height } = useWindowDimensions();

  const getPhoto = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        Alert.alert('Error:', response.errorMessage);
        return;
      }

      const selectedImage = response.assets && response.assets[0]?.uri;
      if (selectedImage) {
        setUserPhoto(selectedImage);
      }
    });
  };

  const saveUserData = async () => {
    if (!userName.trim()) {
      Alert.alert('Please enter your name');
      return;
    }

    try {
      const userData = { userName, userPhoto };

      await AsyncStorage.setItem('userProfile', JSON.stringify(userData));

      navigation.replace('StructureHome');

      console.log('saved:', userData);
    } catch (error) {
      Alert.alert('Failed to save user data');
    }
  };

  return (
    <ImageBackground source={bgImg} style={styles.bgImage}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: height * 0.09,
            paddingBottom: 30,
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.title}>Registration</Text>

          <View style={styles.hint}>
            <Image source={require('../assets/images/header_img.png')} />
            <Text style={styles.hintText}>
              You can fill out your profile minimally.
              {'\n'}
              It's not the information that matters, but your perspective.
            </Text>
          </View>

          <View style={styles.card}>
            <TextInput
              placeholder="Your name"
              placeholderTextColor="#6B6B6B"
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
              maxLength={12}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.photoLabel}>Photo:</Text>
              <TouchableOpacity style={styles.photoBox} onPress={getPhoto}>
                {userPhoto ? (
                  <Image source={{ uri: userPhoto }} style={styles.photo} />
                ) : (
                  <Image
                    source={require('../assets/images/photo_placeholder.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {userName.trim() && userPhoto && (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingBottom: height * 0.06,
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={saveUserData}
                disabled={!userName.trim()}
              >
                <LinearGradient
                  colors={primaryGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 34,
  },
  hint: {
    backgroundColor: secondaryDark,
    borderRadius: 12,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    overflow: 'hidden',
  },
  hintText: {
    color: textFFF,
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: secondaryDark,
    borderRadius: 12,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: textFFF,
    color: textFFF,
    fontSize: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  photoLabel: {
    color: '#6B6B6B',
  },
  photoBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: textFFF,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  buttonText: {
    color: textFFF,
    fontSize: 16,
    fontWeight: '400',
  },
  gradientButton: {
    width: '70%',
    height: 67,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default IndexRegistration;
