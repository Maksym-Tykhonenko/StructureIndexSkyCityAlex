import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSkyCityStore } from '../StructureIndexStore/skyContextProvider';

const bgImg = require('../assets/images/background.png');
const backIcon = require('../assets/images/back_arr.png');

const primaryGradient = ['#5B421E', '#FFCE88'];
const dangerGradient = ['#5B1E1E', '#FF8888'];
const secondaryDark = '#171717';
const textFFF = '#FFFFFF';

const SkyProfileScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { loadSavedProfile, name, photo, setPhoto } = useSkyCityStore();

  useEffect(() => {
    loadSavedProfile();
  }, []);

  const changePhoto = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.didCancel || response.errorCode) {
        return;
      }

      const selectedUri = response.assets?.[0]?.uri;
      if (selectedUri) {
        setPhoto(selectedUri);
        saveProfile(name, selectedUri);
      }
    });
  };

  const saveProfile = async (userName, userPhoto) => {
    try {
      const profileData = JSON.stringify({ userName, userPhoto });
      await AsyncStorage.setItem('userProfile', profileData);
    } catch (error) {
      console.error('Error saving user profile :(', error);
    }
  };

  const deleteProfile = () => {
    Alert.alert(
      'Delete Profile',
      'This action will permanently remove your profile data. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userProfile');

              navigation.replace('IndexRegistration');
            } catch (error) {
              console.error('Error deleting profile:', error);
            }
          },
        },
      ],
    );
  };

  const deleteProgress = () => {
    Alert.alert(
      'Delete Progress',
      'This action will delete all saved places. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('savedPlaces');
              console.log('Saved places have been deleted.');
            } catch (error) {
              console.error('Error deleting saved progress:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <ImageBackground source={bgImg} style={styles.bgImage}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.container, { paddingTop: height * 0.1 }]}>
          <TouchableOpacity
            style={styles.backRow}
            onPress={() => navigation.goBack()}
          >
            <Image source={backIcon} />
            <Text style={styles.backText}>Profile</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <View style={styles.input}>
              <Text style={styles.name}>{name}</Text>
            </View>

            <View style={styles.photoRow}>
              <View style={{ gap: 12 }}>
                <Text style={styles.photoLabel}>Photo:</Text>
                <TouchableOpacity onPress={changePhoto} activeOpacity={0.7}>
                  <LinearGradient
                    colors={primaryGradient}
                    style={styles.changeBtn}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.changeText}>Change photo</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {photo && <Image source={{ uri: photo }} style={styles.avatar} />}
            </View>
          </View>

          <TouchableOpacity onPress={deleteProfile} activeOpacity={0.8}>
            <LinearGradient
              colors={dangerGradient}
              style={styles.actionBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.actionText}>DELETE PROFILE</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteProgress} activeOpacity={0.8}>
            <LinearGradient
              colors={dangerGradient}
              style={styles.actionBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.actionText}>DELETE PROGRESS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  backText: {
    color: textFFF,
    fontSize: 15,
    fontWeight: '600',
  },
  card: {
    backgroundColor: secondaryDark,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    color: textFFF,
    fontSize: 16,
    fontWeight: '600',
  },
  photoLabel: {
    color: '#6B6B6B',
  },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  changeBtn: {
    width: 140,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeText: {
    color: textFFF,
    fontSize: 12,
    fontWeight: '400',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  actionBtn: {
    height: 67,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    width: '70%',
    alignSelf: 'center',
  },
  actionText: {
    color: textFFF,
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: textFFF,
    color: textFFF,
    fontSize: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
});

export default SkyProfileScreen;
