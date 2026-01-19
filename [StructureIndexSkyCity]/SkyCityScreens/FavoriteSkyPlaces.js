import React, { useCallback } from 'react';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSkyCityStore } from '../StructureIndexStore/skyContextProvider';

const bgImg = require('../assets/images/background.png');
const eyeIcon = require('../assets/images/el_eye-open.png');
const backIcon = require('../assets/images/back_arr.png');
const emptyImg = require('../assets/images/emptyScreen.png');

const primaryGradient = ['#5B421E', '#FFCE88'];
const secondaryDark = '#171717';
const textFFF = '#FFFFFF';

const FavoriteSkyPlaces = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const { places, getSavedPlaces } = useSkyCityStore();

  useFocusEffect(
    useCallback(() => {
      getSavedPlaces();
    }, []),
  );

  return (
    <ImageBackground source={bgImg} style={styles.bgImage}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { paddingTop: height * 0.1 }]}>
          <TouchableOpacity
            style={styles.backRow}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Image source={backIcon} />
            <Text style={styles.backText}>Saved places</Text>
          </TouchableOpacity>

          {places.length === 0 && (
            <View style={styles.emptyWrap}>
              <Image source={emptyImg} style={styles.emptyImg} />
              <Text style={styles.emptyText}>
                Keep what you want to return to.
              </Text>
            </View>
          )}

          {places.map(item => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>
                {item.title} ({item.location})
              </Text>

              <Text style={styles.coords}>Coordinates: {item.coords}</Text>

              <View style={styles.imageWrap}>
                <Image source={item.image} style={styles.image} />

                <TouchableOpacity
                  style={styles.eyeBtn}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('CityLocationsDetails', {
                      place: item,
                      screen: 'FavoriteSkyPlaces',
                    })
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
  bgImage: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
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
    fontWeight: '500',
  },
  emptyWrap: {
    backgroundColor: secondaryDark,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emptyImg: {
    borderRadius: 12,
  },
  emptyText: {
    color: textFFF,
    fontSize: 14,
    flex: 1,
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

export default FavoriteSkyPlaces;
