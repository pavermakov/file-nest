import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { theme } from 'src/theme';

const RootLayout = () => (
  <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="add-file" options={{ title: 'New upload', headerBackTitle: 'Back' }} />
      </Stack>
    </ThemeProvider>
  </SafeAreaProvider>
);

export default RootLayout;
