import { Ionicons } from '@expo/vector-icons';
import styled, { useTheme } from 'styled-components/native';
import type { ThemedProps } from 'src/types';
import { MarchingAntsBorder } from './MarchingAntsBorder';

type Props = {
  onPress: () => void;
};

const Card = styled.TouchableOpacity`
  background-color: ${({ theme }: ThemedProps) => theme.colors.surface};
  border-radius: 20px;
  padding: 48px 24px;
  align-items: center;
  gap: 12px;
`;

const IconBadge = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${({ theme }: ThemedProps) => theme.colors.background};
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }: ThemedProps) => theme.colors.text};
`;

const Hint = styled.Text`
  font-size: ${({ theme }: ThemedProps) => theme.fontSizes.body}px;
  color: ${({ theme }: ThemedProps) => theme.colors.textMuted};
`;

export const Dropzone = ({ onPress }: Props) => {
  const theme = useTheme();

  return (
    <MarchingAntsBorder borderRadius={20}>
      <Card
        onPress={onPress}
        activeOpacity={0.7}
      >
        <IconBadge>
          <Ionicons
            name="cloud-upload-outline"
            size={34}
            color={theme.colors.primary}
          />
        </IconBadge>

        <Label>
          Tap to choose a file
        </Label>

        <Hint>
          Images only · up to 100MB
        </Hint>
      </Card>
    </MarchingAntsBorder>
  );
};
