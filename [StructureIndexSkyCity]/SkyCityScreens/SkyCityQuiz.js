import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { skyQuestions } from '../StructureData/skyQuestions';

const bgImg = require('../assets/images/background.png');

const primaryGradient = ['#5B421E', '#FFCE88'];
const secondaryDark = '#171717';
const textFFF = '#FFFFFF';
const gradientStartPos = { x: 0, y: 0 };
const gradientEndPos = { x: 1, y: 0 };

const SkyCityQuizScreen = () => {
  const navigation = useNavigation();
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const { height } = useWindowDimensions();

  const question = skyQuestions[current];

  const chooseAnswer = index => {
    setSelected(index);

    if (index === question.correctIndex) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setSelected(null);

      if (current < skyQuestions.length - 1) {
        setCurrent(prev => prev + 1);
      } else {
        const totalScore = score + (index === question.correctIndex ? 1 : 0);
        Alert.alert(
          'Quiz Finished!',
          `You answered correctly ${totalScore} out of ${skyQuestions.length} questions.`,
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      }
    }, 1000);
  };

  if (!started) {
    return (
      <ImageBackground source={bgImg} style={styles.bgImage}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.centered, { paddingTop: height * 0.1 }]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
                marginBottom: height * 0.04,
              }}
            >
              <Image source={require('../assets/images/back_arr.png')} />
              <Text style={styles.backText}>Difficult quiz</Text>
            </TouchableOpacity>

            <View style={styles.introCard}>
              <Image source={require('../assets/images/intro_quiz.png')} />
              <View style={{ flex: 1, padding: 12 }}>
                <Text style={styles.introText}>
                  This quiz is not about speed. It's about attentiveness. If in
                  doubt, trust your logic, not your intuition.
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingBottom: height * 0.07,
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => setStarted(true)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={primaryGradient}
                  style={styles.mainBtn}
                  start={gradientStartPos}
                  end={gradientEndPos}
                >
                  <Text style={styles.btnText}>Start quiz</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={bgImg} style={styles.bgImage}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { paddingTop: height * 0.1 }]}>
          <Text style={[styles.title, { marginBottom: height * 0.03 }]}>
            Difficult quiz
          </Text>

          <View style={styles.questionCard}>
            <Text style={styles.questionText}>
              {current + 1}. {question.question}
            </Text>
          </View>

          {question.answers.map((answer, index) => {
            const isSelected = selected === index;
            const isCorrect = index === question.correctIndex;

            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                disabled={selected !== null}
                onPress={() => chooseAnswer(index)}
              >
                <LinearGradient
                  start={gradientStartPos}
                  end={gradientEndPos}
                  colors={
                    isSelected
                      ? isCorrect
                        ? ['#4CAF50', '#5f9a61ff']
                        : ['#8B2E2E', '#b74747ff']
                      : primaryGradient
                  }
                  style={styles.answerBtn}
                >
                  <View style={{ paddingHorizontal: 20 }}>
                    <Text style={styles.answerText}>
                      {String.fromCharCode(65 + index)}. {answer}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: height * 0.05,
              width: '100%',
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={primaryGradient}
                style={styles.exitBtn}
                start={gradientStartPos}
                end={gradientEndPos}
              >
                <Text style={styles.btnText}>EXIT QUIZ</Text>
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
    padding: 20,
    paddingTop: 80,
    flex: 1,
  },
  backText: {
    color: textFFF,
    fontSize: 15,
    fontWeight: '500',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: textFFF,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  introCard: {
    backgroundColor: secondaryDark,
    borderRadius: 12,
    marginBottom: 40,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  introText: {
    color: textFFF,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  questionCard: {
    backgroundColor: secondaryDark,
    borderRadius: 12,
    padding: 34,
    marginBottom: 20,
  },
  questionText: {
    color: textFFF,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  answerBtn: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    marginBottom: 14,
    width: '100%',
  },
  answerText: {
    color: textFFF,
    fontSize: 16,
    fontWeight: '600',
  },
  mainBtn: {
    height: 67,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  exitBtn: {
    height: 67,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: '70%',
    alignSelf: 'center',
  },
  btnText: {
    color: textFFF,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SkyCityQuizScreen;
