import {LayoutChangeEvent, Pressable, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import tw from 'twrnc';

export interface TabButton {
  title: string;
  accessibilityLabel: string;
  onPress: () => void;
}

interface TabButtonsProps {
  buttons: TabButton[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
}

/**
 * An animated tab bar of buttons - when user selects a button, tab slides and style changes
 */
const TabButtons: FC<TabButtonsProps> = ({
  buttons,
  selectedTab,
  setSelectedTab,
}) => {
  const [dimensions, setDimensions] = useState({height: 20, width: 100});

  const buttonWidth = dimensions.width / buttons.length;

  const padding = 10;

  // this will keep track of the translationX value of our moving tab
  const tabPositionX = useSharedValue(0);

  // on view layout, we measure the width and height and
  // set in state so we know how far to move the tab
  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  // We can set a callback for any functionality that should fire once the animation is finished
  const handlePressCb = (index: number) => {
    setSelectedTab(index);
    buttons[index].onPress();
  };

  const onTabPress = (index: number) => {
    // animate the tab and fire callback
    tabPositionX.value = withTiming(buttonWidth * index, {}, () => {
      runOnJS(handlePressCb)(index);
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    // apply animated value to the style, moving the tab
    return {
      transform: [{translateX: tabPositionX.value}],
    };
  });

  return (
    <View
      accessibilityRole="tabbar"
      style={tw`bg-gray-100 rounded-xl justify-center`}
    >
      <Animated.View
        style={[
          animatedStyle,
          tw`bg-white rounded-lg mx-1 absolute`,
          {
            height: dimensions.height - padding,
            width: buttonWidth - padding,
          },
        ]}
      />
      <View onLayout={onTabbarLayout} style={[tw`flex-row`]}>
        {buttons.map((button, index) => {
          const color = selectedTab === index ? 'green-600' : 'gray-600';

          return (
            <Pressable
              key={index.toString()}
              accessibilityRole="tab"
              accessibilityLabel={button.accessibilityLabel}
              onPress={() => onTabPress(index)}
              style={tw`flex-1 py-4`}
            >
              <Text
                style={tw`text-gray-700 self-center font-semibold text-sm capitalize text-${color}`}
              >
                {button.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabButtons;
