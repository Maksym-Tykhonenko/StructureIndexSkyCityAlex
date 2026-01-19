import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Share,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const bgImg = require('../assets/images/background.png');
const backIcon = require('../assets/images/back_arr.png');
const appIcon = require('../assets/images/appIcon.png');

const primaryGradient = ['#5B421E', '#FFCE88'];
const secondaryDark = '#171717';
const textFFF = '#FFFFFF';
const gradientStartPos = { x: 0, y: 0 };
const gradientEndPos = { x: 1, y: 0 };

const AboutSkyCityScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  const shareApp = async () => {
    try {
      await Share.share({
        title: 'SkaiCity: Adventure Structure',
        message:
          'SkaiCity: Adventure Structure is a reference app for the tallest urban structures in Australia and New Zealand.\n\nExplore buildings, maps, daily facts and a challenging quiz.\n\n— Sky City',
      });
    } catch (error) {
      console.log('Catch Share error:', error);
    }
  };

  return (
    <ImageBackground source={bgImg} style={styles.bgImage}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { paddingTop: height * 0.1 }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={styles.backRow}
          >
            <Image source={backIcon} />
            <Text style={styles.backText}>Information</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Image source={appIcon} style={styles.appIcon} />

            <Text style={styles.description}>
              SkaiCity: Adventure Structure is a reference app for the tallest
              urban structures in Australia and New Zealand. It features
              detailed building descriptions, an interactive map, daily facts,
              and a challenging quiz for those who want to gain a deeper
              understanding of the city's scale. The app works autonomously,
              without public profiles and without data transfer.
            </Text>

            <TouchableOpacity
              onPress={shareApp}
              activeOpacity={0.7}
              style={{ marginTop: 30, width: '100%', alignItems: 'center' }}
            >
              <LinearGradient
                colors={primaryGradient}
                start={gradientStartPos}
                end={gradientEndPos}
                style={styles.shareBtn}
              >
                <Text style={styles.btnText}>SHARE</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    paddingBottom: 30,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 30,
  },
  backText: {
    color: textFFF,
    fontSize: 15,
    fontWeight: '600',
  },
  card: {
    backgroundColor: secondaryDark,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  appIcon: {
    width: 205,
    height: 205,
    marginBottom: 20,
    borderRadius: 60,
  },
  description: {
    color: textFFF,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: '600',
  },
  shareBtn: {
    height: 67,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
  },
  btnText: {
    color: textFFF,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AboutSkyCityScreen;
