import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { onboardInfo } from '../StructureData/onboardInfo';
import { useSkyCityStore } from '../StructureIndexStore/skyContextProvider';

const bgImg = require('../assets/images/background.png');
const primaryGradient = ['#5B421E', '#FFCE88'];
const textFFF = '#ffffffff';

const SkyCityOnboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { createdProfile, checkProfile } = useSkyCityStore();

  useEffect(() => {
    checkProfile();
  }, []);

  const onNextPress = () => {
    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
    } else {
      createdProfile
        ? navigation.replace('StructureHome')
        : navigation.replace('IndexRegistration');
    }
  };

  return (
    <ImageBackground source={bgImg} style={styles.bgImage}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: height * 0.04,
          paddingBottom: height * 0.03,
        }}
      >
        <View style={styles.viewWrapper}>
          <Image
            source={onboardInfo[currentIndex].structureimg}
            style={[
              styles.onimage,
              {
                resizeMode: 'contain',
                borderRadius: 12,
              },
            ]}
          />

          <Text style={styles.title}>
            {onboardInfo[currentIndex].structurettl}
          </Text>
          <Text style={styles.secondText}>
            {onboardInfo[currentIndex].structuretxt}
          </Text>
          <TouchableOpacity activeOpacity={0.6} onPress={onNextPress}>
            <LinearGradient
              colors={primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>
                {onboardInfo[currentIndex].structurebtn}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  viewWrapper: {
    paddingHorizontal: 14,
  },
  onimage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    color: textFFF,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  secondText: {
    color: textFFF,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 32,
    fontWeight: '400',
  },
  gradientButton: {
    width: '70%',
    height: 67,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: textFFF,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default SkyCityOnboard;
