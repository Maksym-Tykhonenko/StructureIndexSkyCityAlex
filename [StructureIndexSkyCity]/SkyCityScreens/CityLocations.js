import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { skyCityLocations } from '../StructureData/skyCityLocations';

const bgImg = require('../assets/images/background.png');
const eyeIcon = require('../assets/images/el_eye-open.png');
const backIcon = require('../assets/images/back_arr.png');

const primaryGradient = ['#5B421E', '#FFCE88'];
const secondaryDark = '#171717';
const textFFF = '#FFFFFF';

const CityLocations = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  return (
    <ImageBackground source={bgImg} style={styles.structureBg}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { paddingTop: height * 0.1 }]}>
          <TouchableOpacity
            style={styles.backStructureRow}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={backIcon} />
            <Text style={styles.backText}>Selection of places</Text>
          </TouchableOpacity>

          {skyCityLocations.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>
                {item.title} ({item.location})
              </Text>

              <Text style={styles.coords}>Coordinates: {item.coords}</Text>

              <View style={styles.imageWrap}>
                <Image source={item.image} style={styles.image} />

                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() =>
                    navigation.navigate('CityLocationsDetails', { place: item })
                  }
                >
                  <LinearGradient
                    colors={primaryGradient}
                    style={styles.eyeGradient}
                  >
                    <Image source={eyeIcon} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  structureBg: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backStructureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  backText: {
    color: textFFF,
    fontSize: 15,
    fontWeight: '500',
  },
  card: {
    backgroundColor: secondaryDark,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    color: textFFF,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  coords: {
    color: textFFF,
    fontSize: 12,
    marginBottom: 12,
    fontWeight: '300',
  },
  imageWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  image: {
    width: '80%',
    height: 130,
    borderRadius: 12,
  },
  eyeGradient: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CityLocations;
