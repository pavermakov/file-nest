import type { Theme } from 'src/theme';

export type ThemedProps = {
  theme: Theme
};

export type PickedFile = {
  name: string;
  size: number;
  mimeType: string;
};
