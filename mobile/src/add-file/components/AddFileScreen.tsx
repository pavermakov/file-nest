import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useFilePicker } from 'src/add-file/hooks/useFilePicker';
import { Dropzone } from './Dropzone';
import { FileConfirmCard } from './FileConfirmCard';

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

export const AddFileScreen = () => {
  const { file, pick, clear } = useFilePicker();

  const heading = file ? 'Ready to upload?' : 'Add a file';
  const subtitle = file
    ? 'Review the file below, then tap upload to finish.'
    : "Pick an image to get started. We’ll keep them organized.";

  return (
    <Container edges={['bottom']}>
      <Title>{heading}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {file ? (
        <FileConfirmCard
          file={file}
          onClear={clear}
          onChangeFile={pick}
          onUpload={() => {}}
        />
      ) : (
        <Dropzone onPress={pick} />
      )}
    </Container>
  );
};
