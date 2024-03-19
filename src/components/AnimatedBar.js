import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ProgressBar = ({ progress }) => {
  const filledWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fillAnimation = Animated.timing(filledWidth, {
      toValue: progress,
      duration: 3000, // Adjust the duration as needed
      useNativeDriver: false, // Required for width animation
    });

    fillAnimation.start();

    return () => {
      filledWidth.setValue(0); // Reset the filledWidth value
    };
  }, [progress]);

  return (
    <View style={styles.container}>
    <Animated.View 
  style={[
    styles.progressBar, 
    { width: filledWidth.interpolate({ 
        inputRange: [0, 1], 
        outputRange: ['0%', '100%'] 
      }) 
    }
  ]} 
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden', // Clip the progress bar within the container
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default ProgressBar;
