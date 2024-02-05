import { ScrollView, View } from "react-native";

const ScrollContainer = ({ children, horizontal = false }) => {
  return (
    <ScrollView
      horizontal={horizontal}
      className={`relative overflow-hidden flex ${
        horizontal ? "flex-row" : "flex-col"
      } overflow-auto scroll-smooth`}
      ref={containerRef}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollContainer;
