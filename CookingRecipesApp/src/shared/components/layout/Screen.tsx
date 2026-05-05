import React from 'react';
import { StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  statusBarStyle?: 'light-content' | 'dark-content';
};

export function Screen({ children, style, statusBarStyle }: ScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={statusBarStyle ?? 'dark-content'}
      />
      <SafeAreaView
        style={[styles.container, { paddingTop: insets.top }, style]}
        edges={['bottom']}>
        {children}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F1',
  },
});
