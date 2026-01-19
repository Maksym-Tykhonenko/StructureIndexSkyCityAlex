import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { skyCityLocations } from '../StructureData/skyCityLocations';

const bgImg = require('../assets/images/background.png');
const backIcon = require('../assets/images/back_arr.png');
const eyeIcon = require('../assets/images/el_eye-open_s.png');

const primaryGradient = ['#5B421E', '#FFCE88'];
const secondaryDark = '#171717';
const textFFF = '#FFFFFF';

const initialRegion = {
  latitude: -33.86,
  longitude: 151.21,
  latitudeDelta: 15,
  longitudeDelta: 15,
};

const InteractiveMapScreen = () => {
  const navigation = useNavigation();
  const { height } = useWindowDimensions();
  const [selectedPlace, setSelectedPlace] = useState(null);

  const parsedPlaces = useMemo(() => {
    return skyCityLocations.map(place => {
      const [lat, lng] = place.coords.split(',').map(v => Number(v.trim()));

      return {
        ...place,
        latitude: lat,
        longitude: lng,
      };
    });
  }, []);

  return (
    <ImageBackground source={bgImg} style={styles.structureBg}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={[
            styles.container,
            { paddingTop: height * 0.1, paddingBottom: 30 },
          ]}
        >
          <TouchableOpacity
            style={styles.backStructureRow}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Image source={backIcon} />
            <Text style={styles.backText}>Interactive map</Text>
          </TouchableOpacity>

          <View style={styles.mapWrap}>
            <View style={{ borderRadius: 12, overflow: 'hidden' }}>
              <MapView
                style={{ width: '100%', height: height * 0.7 }}
                userInterfaceStyle="dark"
                initialRegion={initialRegion}
                onPress={() => setSelectedPlace(null)}
              >
                {parsedPlaces.map(place => (
                  <Marker
                    key={place.id}
                    coordinate={{
                      latitude: place.latitude,
                      longitude: place.longitude,
                    }}
                    onPress={e => {
                      e.stopPropagation();
                      setSelectedPlace(place);
                    }}
                  >
                    <Image
                      source={require('../assets/images/f7_map-pin.png')}
                    />
                  </Marker>
                ))}
              </MapView>
            </View>

            {selectedPlace && (
              <View style={styles.bottomCard}>
                <Text style={styles.cardTitle}>
                  {selectedPlace.title} ({selectedPlace.location})
                </Text>

                <Text style={styles.cardCoords}>
                  Coordinates: {selectedPlace.coords}
                </Text>

                <View style={styles.cardImageWrap}>
                  <Image
                    source={selectedPlace.image}
                    style={styles.cardImage}
                  />

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CityLocationsDetails', {
                        place: selectedPlace,
                        screen: 'StructureMapScreen',
                      })
                    }
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={primaryGradient}
                      style={styles.eyeBtn}
                    >
                      <Image source={eyeIcon} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  structureBg: { flex: 1 },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  backStructureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 26,
  },
  backText: {
    color: textFFF,
    fontSize: 15,
    fontWeight: '500',
  },
  mapWrap: {
    borderRadius: 12,
    backgroundColor: secondaryDark,
    padding: 16,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 46,
    backgroundColor: secondaryDark,
    borderRadius: 9,
    padding: 16,
    width: '90%',
    alignSelf: 'center',
  },
  cardTitle: {
    color: textFFF,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardCoords: {
    color: textFFF,
    fontSize: 10,
    marginBottom: 12,
  },
  cardImageWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '78%',
    height: 96,
    borderRadius: 9,
  },
  eyeBtn: {
    width: 35,
    height: 35,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InteractiveMapScreen;
