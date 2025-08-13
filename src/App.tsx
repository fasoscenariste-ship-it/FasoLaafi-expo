import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { SafeAreaView, StatusBar } from 'react-native';
import { useAppInit } from './state/store';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import RemindersScreen from './screens/RemindersScreen';
import AdviceScreen from './screens/AdviceScreen';
import BoostScreen from './screens/BoostScreen';
import MeditationScreen from './screens/MeditationScreen';
import CommunityScreen from './screens/CommunityScreen';
import SettingsScreen from './screens/SettingsScreen';
import './i18n/i18n';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const init = useAppInit();

  useEffect(() => { init(); }, [init]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0a0f0d' }}>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerStyle: { backgroundColor: '#0a0f0d' },
            headerTintColor: '#fff',
            contentStyle: { backgroundColor: '#0a0f0d' }
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Faso Laafi' }} />
          <Stack.Screen name="Reminders" component={RemindersScreen} options={{ title: 'Rappels' }} />
          <Stack.Screen name="Advice" component={AdviceScreen} options={{ title: 'Conseils santé' }} />
          <Stack.Screen name="Boost" component={BoostScreen} options={{ title: 'Boost du matin' }} />
          <Stack.Screen name="Meditation" component={MeditationScreen} options={{ title: 'Méditation du soir' }} />
          <Stack.Screen name="Community" component={CommunityScreen} options={{ title: 'Cercle de santé' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Paramètres' }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
