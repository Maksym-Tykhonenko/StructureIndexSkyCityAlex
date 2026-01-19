import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Share,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const bgImg = require('../assets/images/background.png');
const factIcon = require('../assets/images/fact_img.png');
const infoBtnImg = require('../assets/images/info_btn.png');
const shareBtnImg = require('../assets/images/share_btn.png');

const primaryGradient = ['#5B421E', '#FFCE88'];
const textFFF = '#FFFFFF';
const secondaryDark = '#171717';

const FACTS = [
  'Tall buildings are often designed to appear lower than they actually are from the street.',
  'In coastal cities, the height of a building almost always aligns with the direction of the wind.',
  'Many modern towers have technical floors that are never seen by visitors.',
  'The height of a building affects not only the panorama, but also the microclimate around it.',
  'The taller a building, the more attention is paid to the silence inside.',
  'In some cities, skyscrapers are built with shadows in mind.',
  'Architects often hide engineering solutions behind simple shapes.',
  'Towers are rarely designed symmetrically.',
  'Tall buildings almost always have their own internal logic.',
  'Modern architecture combines height with lightness.',
  'Some buildings appear straight but have a slight slope.',
  'Upper floors often have different purposes than lower ones.',
  'In tall buildings, sound travels differently.',
  'Architects design emotions, not just form.',
  'Height changes the perception of an entire area.',
  'Often the most interesting spaces are in the middle.',
  'Light behaves differently at upper levels.',
  'Some towers are designed to disappear into the sky.',
  'Small details matter more than they seem.',
  'Urban skylines change slowly, but each tower leaves a mark.',
  'Height is used to optimize space.',
  'Engineering matters more than decoration.',
  'Buildings are designed with the future in mind.',
  'Complexity is often hidden inside simplicity.',
  'Height is a balance between technology and calm.',
  'Tall buildings offer many usage scenarios.',
  'Some structures become landmarks quietly.',
  'High-rise buildings can be islands of silence.',
  'Architecture always works with emotion.',
  'Height is about how the city breathes.',
];

const getRandomFact = () => FACTS[Math.floor(Math.random() * FACTS.length)];

const StructureHome = () => {
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [fact, setFact] = useState('');
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    getSavedUserData();
    setFact(getRandomFact());
  }, []);

  const getSavedUserData = async () => {
    try {
      const svdData = await AsyncStorage.getItem('userProfile');

      if (svdData) {
        const userData = JSON.parse(svdData);
        setUserName(userData.userName);
        setUserPhoto(userData.userPhoto);
      }
    } catch (error) {
      console.error('Failed to load user ::', error);
    }
  };

  const shareFact = async () => {
    try {
      await Share.share({
        title: 'High fact',
        message: `High fact:\n\n${fact}`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const navigateTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground source={bgImg} style={styles.bgImage}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { paddingTop: height * 0.09 }]}>
          <View style={styles.header}>
            <View style={styles.userRowWrap}>
              {userPhoto && (
                <Image source={{ uri: userPhoto }} style={styles.avatar} />
              )}
              <Text style={styles.greeting}>Good day, {userName}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AboutSkyCityScreen')}
            >
              <LinearGradient colors={primaryGradient} style={styles.infoBtn}>
                <Image source={infoBtnImg} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.factCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.factTitle}>High fact:</Text>
              <Text style={styles.factText}>{fact}</Text>
              <TouchableOpacity onPress={shareFact} activeOpacity={0.7}>
                <LinearGradient colors={primaryGradient} style={styles.infoBtn}>
                  <Image source={shareBtnImg} />
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <Image source={factIcon} style={styles.factImage} />
          </View>

          {[
            { title: 'Selection of places', screen: 'CityLocations' },
            { title: 'Difficult quiz', screen: 'SkyCityQuiz' },
            { title: 'Interactive map', screen: 'StructureMapScreen' },
            { title: 'Saved places', screen: 'FavoriteSkyPlaces' },
            { title: 'Profile', screen: 'SkyProfileScreen' },
          ].map(btn => (
            <TouchableOpacity
              key={btn.title}
              activeOpacity={0.8}
              onPress={() => navigateTo(btn.screen)}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={primaryGradient}
                style={styles.menuButton}
              >
                <Text style={styles.menuText}>{btn.title}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: { flex: 1 },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userRowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 53,
    height: 53,
    borderRadius: 12,
  },
  greeting: {
    color: textFFF,
    fontSize: 15,
    fontWeight: '600',
  },
  infoBtn: {
    width: 47,
    height: 47,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  factCard: {
    backgroundColor: secondaryDark,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  factTitle: {
    color: textFFF,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  factText: {
    color: textFFF,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    marginBottom: 30,
  },
  factImage: {
    marginLeft: 15,
  },
  menuButton: {
    height: 67,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  menuText: {
    color: textFFF,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default StructureHome;
