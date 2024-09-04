import * as React from "react";
import { ImageBackground, Modal } from "react-native";

import { Sections } from "@/components";
import { LocationType } from "@/types";
import { IMAGES } from "@/config";

import { styles } from "./styles";

export type ModalScreenPropsType = {
  type: "sections";
  isVisible: boolean;
  isTransparent: boolean;
  animationType: "slide" | "none" | "fade";
  config: {
    sections: {
      location: LocationType;
    };
  };
};

export const ModalScreen = ({
  type,
  isVisible,
  isTransparent,
  animationType,
  config: {
    sections: { location },
  },
}: ModalScreenPropsType) => (
  <Modal
    visible={isVisible}
    transparent={isTransparent}
    animationType={animationType}
    style={styles.container}
  >
    {type === "sections" && (
      <>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="cover"
          style={styles.imageBackground}
        />

        <Sections location={location} />
      </>
    )}
  </Modal>
);
