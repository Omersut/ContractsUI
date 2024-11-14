import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/mobile.png')}
          style={styles.logo}
        />
      }>

      {/* Search Section */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>

      {/* Steps */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Browse Excursions</ThemedText>
        <ThemedText>
          Search for available excursions by entering a destination, date, or type of activity.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: View Details</ThemedText>
        <ThemedText>
          Tap on an excursion to view details, including itinerary, pricing, and availability.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Make a Booking</ThemedText>
        <ThemedText>
          When ready, complete your booking with secure blockchain-supported payment for a worry-free travel experience.
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 16,
  },
  logo: {
    height: 355,
    width: 400,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
});
