import React, { ReactElement } from "react";
import { Dimensions, StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderBarWrapperProps extends Omit<ViewProps, "children" | "style"> {
  alignMethod?: string;
  children?: ReactElement | ReactElement[];
}

/**
 * Wrapper for the header bar.
 * Must be inside `SafeAreaProvider`, placed at the top.
 * Otherwise, an error will occur.
 * Doesn't support styling by props.
 *
 * @param alignMethod: a string consisting of 'l', 'c' and 'r' (case insensitive)
 *
 */
const HeaderBarWrapper: React.FC<HeaderBarWrapperProps> = ({
  children,
  alignMethod = "llllll",
  ...props
}) => {
  const { top } = useSafeAreaInsets();
  if (children === undefined) {
    return <View style={[styles.header, { paddingTop: top }]}></View>;
  }
  const childrenList = Array.isArray(children) ? children : [children];
  if (
    alignMethod.length !== childrenList.length ||
    !/^l*c*r*$/gi.test(alignMethod)
  ) {
    alignMethod = "llllll";
  }
  const leftElements: ReactElement[] = [];
  const centerElements: ReactElement[] = [];
  const rightElements: ReactElement[] = [];
  childrenList.forEach((children, i) => {
    switch (alignMethod.at(i)) {
      case "c":
        centerElements.push(children);
        break;
      case "r":
        rightElements.push(children);
        break;
      case "l":
      default:
        leftElements.push(children);
    }
  });
  return (
    <View {...props} style={[styles.header, { paddingTop: top }]}>
      <View style={[styles.header_content, { justifyContent: "flex-start" }]}>
        {leftElements}
      </View>
      <View style={[styles.header_content, { justifyContent: "center" }]}>
        {centerElements}
      </View>
      <View style={[styles.header_content, { justifyContent: "flex-end" }]}>
        {rightElements}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    borderBottomWidth: 0.2, // The minimal pixel unit
    flex: 0,
    flexDirection: "row",
    height: Dimensions.get("screen").height * 0.12, // 4% reserved and 8% content
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  header_content: {
    flex: 1,
    flexDirection: "row",
  },
});

export default HeaderBarWrapper;
