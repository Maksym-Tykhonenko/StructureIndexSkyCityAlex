import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

const bgImg = require('../assets/images/background.png');
const backIcon = require('../assets/images/back_arr.png');
const mapIcon = require('../assets/images/map_btn.png');
const shareIcon = require('../assets/images/share_btn.png');
const bookmarkIcon = require('../assets/images/bookmark.png');
const bookmarkFilledIcon = require('../assets/images/bookmark_filled.png');

const primaryGradient = ['#5B421E', '#FFCE88'];
const secondaryDark = '#171717';
const textFFF = '#FFFFFF';

const SAVED_PLACES_KEY = 'savedPlaces';

const CityLocationsDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { place, screen } = route.params;

  const { height } = useWindowDimensions();

  const [showMap, setShowMap] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { lat, lng } = useMemo(() => {
    const [latitude, longitude] = place.coords
      .split(',')
      .map(v => Number(v.trim()));

    return { lat: latitude, lng: longitude };
  }, [place.coords]);

  useEffect(() => {
    isSavedCard();
  }, []);

  const isSavedCard = async () => {
    try {
      const savedCards = await AsyncStorage.getItem(SAVED_PLACES_KEY);

      if (!savedCards) {
        return;
      }

      const savedPlaces = JSON.parse(savedCards);

      const isPlaceSaved = savedPlaces.some(item => item.id === place.id);

      setIsSaved(isPlaceSaved);
    } catch (error) {
      console.error('Error checking saved card status:', error);
    }
  };

  const toggleSave = async () => {
    try {
      const svdDaata = await AsyncStorage.getItem(SAVED_PLACES_KEY);
      const savedPlaces = svdDaata ? JSON.parse(svdDaata) : [];

      let updatedPlaces;

      if (isSaved) {
        updatedPlaces = savedPlaces.filter(item => item.id !== place.id);
        setIsSaved(false);
      } else {
        updatedPlaces = [...savedPlaces, place];
        setIsSaved(true);
      }

      await AsyncStorage.setItem(
        SAVED_PLACES_KEY,
        JSON.stringify(updatedPlaces),
      );
    } catch (error) {
      console.error('Error toggling =>', error);
    }
  };

  const sharePlace = () => {
    try {
      Share.share({
        title: `Place: ${place.title}`,
        message:
          `${place.title}\n\n` +
          `Location: ${place.coords}\n\n` +
          `${place.description}`,
      });
    } catch (error) {
      console.error('fail !', error);
    }
  };

  return (
    <ImageBackground source={bgImg} style={styles.bgImage}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { paddingTop: height * 0.1 }]}>
          <TouchableOpacity
            style={styles.backRowWrap}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Image source={backIcon} />
            <Text style={styles.backText}>
              {screen === 'FavoriteSkyPlaces' && 'Saved places'}
              {screen === 'CityLocations' && 'Selection of places'}
              {screen === 'StructureMapScreen' && 'Interactive map'}
            </Text>
          </TouchableOpacity>

          {showMap ? (
            <View style={styles.mapCard}>
              <View
                style={{
                  width: '100%',
                  borderRadius: 12,
                  overflow: 'hidden',
                  height: height * 0.57,
                }}
              >
                <MapView
                  style={styles.mapWrapper}
                  userInterfaceStyle="dark"
                  initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                  }}
                >
                  <Marker coordinate={{ latitude: lat, longitude: lng }}>
                    <Image
                      source={require('../assets/images/f7_map-pin.png')}
                    />
                  </Marker>
                </MapView>
              </View>

              <TouchableOpacity
                onPress={() => setShowMap(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.closeMapText}>Close map</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.card}>
              <View style={styles.imageWrap}>
                <Image source={place.image} style={styles.image} />

                <TouchableOpacity
                  style={styles.bookmarkBtn}
                  onPress={toggleSave}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={isSaved ? primaryGradient : ['#555555', '#171717']}
                    style={styles.iconGradient}
                  >
                    <Image
                      source={isSaved ? bookmarkFilledIcon : bookmarkIcon}
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>
                {place.title} ({place.location})
              </Text>

              <Text style={styles.coords}>Coordinates: {place.coords}</Text>

              <Text style={styles.description}>{place.description}</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  onPress={() => setShowMap(true)}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={primaryGradient}
                    style={styles.actionBtn}
                  >
                    <Image source={mapIcon} />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={sharePlace}>
                  <LinearGradient
                    colors={primaryGradient}
                    style={styles.actionBtn}
                  >
                    <Image source={shareIcon} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
    flex: 1,
  },
  mapWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    marginBottom: 16,
  },
  backRowWrap: {
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
  },
  imageWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 210,
    borderRadius: 12,
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  iconGradient: {
    width: 47,
    height: 47,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: textFFF,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  coords: {
    color: '#B5B5B5',
    fontSize: 12,
    marginBottom: 14,
  },
  description: {
    color: '#8B8B8B',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCard: {
    backgroundColor: secondaryDark,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    paddingBottom: 70,
  },
  mapImage: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    marginBottom: 16,
  },
  closeMapText: {
    color: textFFF,
    fontSize: 14,
    textDecorationLine: 'underline',
    top: 34,
  },
});

export default CityLocationsDetails;
