import { ImageSourcePropType } from "react-native";
import { IMAGES } from "@/constants";

export type EntryType = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  description: string;
};

export const SLIDES_DATA: EntryType[] = [
  {
    id: "product",
    title: "Browse Product",
    image: IMAGES.image1,
    description:
      "The JavaScript object model. Thorough understanding of React.js and its core principles. Familiarity with RESTful APIs. Knowledge of modern authorization mec",
  },
  {
    id: "sg-smlg",
    title: "SG Smlg",
    image: IMAGES.image2,
    description:
      "development  and React practices. Proven work experience as a React Developer. Experience with popular React.js workflows.",
  },
  {
    id: "vj-total",
    title: "VJ Total",
    image: IMAGES.image3,
    description:
      "Develop readable, well documented, and organized front-end code - Document, Review and Provide Code - Participate in design and code reviews - Do functional testing to ensure that code is robust and secure",
  },
];
