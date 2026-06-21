import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Easing, type LayoutChangeEvent } from 'react-native';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Svg, { Rect } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const BorderOverlay = styled(Svg)`
  position: absolute;
  pointer-events: none;
`;

type Props = {
  children: ReactNode;
  borderRadius?: number;
  borderColor?: string;
  strokeWidth?: number;
  dashLength?: number;
  gapLength?: number;
};

export const MarchingAntsBorder = ({
  children,
  borderRadius = 20,
  borderColor = '#d1d5db',
  strokeWidth = 1.5,
  dashLength = 8,
  gapLength = 6,
}: Props) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(offset, {
        toValue: -(dashLength + gapLength),
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [offset, dashLength, gapLength]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  const half = strokeWidth / 2;

  return (
    <View onLayout={handleLayout}>
      {children}

      {size.width > 0 && size.height > 0 && (
        <BorderOverlay
          width={size.width}
          height={size.height}
        >
          <AnimatedRect
            x={half}
            y={half}
            width={size.width - strokeWidth}
            height={size.height - strokeWidth}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke={borderColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${gapLength}`}
            strokeDashoffset={offset}
          />
        </BorderOverlay>
      )}
    </View>
  );
};
