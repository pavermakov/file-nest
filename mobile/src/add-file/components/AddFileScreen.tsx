import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Dropzone } from './Dropzone';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 24px 20px;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 6px;
`;

const Subtitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.body}px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 22px;
  margin-bottom: 28px;
`;

export const AddFileScreen = () => (
  <Container edges={['bottom']}>
    <Title>Add a file</Title>
    <Subtitle>Pick anything — images, docs, designs. We'll keep them organized.</Subtitle>
    <Dropzone />
  </Container>
);
