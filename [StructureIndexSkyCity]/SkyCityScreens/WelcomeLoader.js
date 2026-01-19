import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { skyLoaderHtml } from '../CityConstants/skyLoaderHtml';

const WelcomeLoader = () => {
  const nav = useNavigation();
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      try {
        nav.replace('SkyCityOnboard');

        console.log('nav success!');
      } catch (err) {
        console.warn('replace failed 1', err);
        try {
          //nav.navigate('SkyCityOnboard');
        } catch (err2) {
          console.error('failed err 2', err2);
        }
      }
    }, 2500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        console.log('timer cleared');
      }
    };
  }, [nav]);

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/images/background.png')}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignSelf: 'center',
          }}
        >
          <WebView
            originWhitelist={['*']}
            source={{ html: skyLoaderHtml }}
            style={sty.webview}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const sty = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: 360,
    height: 180,
    backgroundColor: 'transparent',
  },
});

export default WelcomeLoader;
