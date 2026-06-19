import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Header } from './Header';
import { EmptyState } from './EmptyState';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const FilesListScreen = () => (
  <Container>
    <Header />
    <Content>
      <EmptyState />
    </Content>
  </Container>
);
