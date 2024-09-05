import * as React from "react";
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { styling } from "./styles";

export type ModalScreenPropsType = {
  backgroundImageSource?: ImageSourcePropType;
  children?: React.ReactNode;
  isVisible: boolean;
  onClose?: () => void;
};

export const ModalScreen: React.FC<ModalScreenPropsType> = ({
  backgroundImageSource,
  children,
  isVisible,
  onClose,
}) => {
  const { height } = Dimensions.get("window");
  const styles = styling(height);

  const MAX_TRANSLATE_Y = -height + 200;
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
    } else {
      translateY.value = withSpring(0, { damping: 50 });
    }
  }, [isVisible]);

  const rModalScreenStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      <Animated.View style={[styles.container, rModalScreenStyle]}>
        {backgroundImageSource && (
          <ImageBackground
            source={backgroundImageSource}
            resizeMode="stretch"
            style={styles.imageBackground}
          />
        )}
        <View style={styles.pressables}>
          <Pressable onPress={onClose} style={styles.pressable}>
            <Text style={styles.pressableText}>Cancel</Text>
          </Pressable>
          <View style={styles.line} />
          <Pressable style={styles.pressable}>
            <Text style={styles.pressableText}>Add</Text>
          </Pressable>
        </View>
        <View style={styles.children}>{children}</View>
      </Animated.View>
    </>
  );
};
