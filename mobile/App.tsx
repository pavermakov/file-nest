import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme';
import { FilesListScreen } from './src/files-list/components/FilesListScreen';

const App = () => (
  <SafeAreaProvider>
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <FilesListScreen />
    </ThemeProvider>
  </SafeAreaProvider>
);

export default App;
