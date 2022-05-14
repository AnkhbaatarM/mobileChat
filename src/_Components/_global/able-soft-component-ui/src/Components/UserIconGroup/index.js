/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { SvgXml } from "react-native-svg";
import {
  squirlce_border_moon,
  squirlce_border,
  squircleBG,
  squircleBGMoon,
  default_male_old,
  default_user_female,
  default_user_male,
} from "../../assets/icons/svg_mask";

var styles = require("./Styles");
export const RoomIcon = ({
  width = 60,
  height = 60,
  borderColor = "rgba(0,0,0)",
  totalCount = 5,
  extraCountStyle = {},
  backgroundColor = "white",
  array = [
    require("./utils/people.png"),
    require("./utils/people.png"),
    require("./utils/people.png"),
    require("./utils/people.png"),
  ],
  extraCount = array.length - totalCount + 1 > 0
    ? array.length - totalCount
    : 0,
  displayArray = array.slice(0, totalCount + 1),
}) => {
  const containerWidth = (width / 1.2) * displayArray.length;

  const absolutPos = { position: "absolute" };
  const viewContainerStyle = (index) => {
    const left = index !== 0 ? (width * index) / 1.2 : 0;
    return {
      width: width,
      height: height,
      alignSelf: "center",
      position: "absolute",
      left: left,
    };
  };
  const isImageAcceptable = (url) => {
    return url !== undefined && url !== null && url.includes("http");
  };
  const placeholderIcon = (type) => {
    switch (type) {
      case "male":
        return default_user_male();
      case "female":
        return default_user_female();
      case "male_old":
        return default_male_old();
      default:
        return default_user_male();
    }
  };

  return (
    <View
      style={[styles.mainContainer, { height: height, width: containerWidth }]}
    >
      {displayArray.map((item, index) => {
        if (index !== displayArray.length - 1) {
          return (
            <View key={index.toString()} style={viewContainerStyle(index)}>
              {isImageAcceptable(item.uri) ? (
                <FastImage
                  style={[styles.userIcon, { width: width, height: height }]}
                  source={{
                    uri: item.uri,
                    priority: FastImage.priority.low,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              ) : (
                <SvgXml
                  fill={"#ffffff"}
                  style={[styles.userIcon, { width: width, height: height }]}
                  width={width}
                  height={height}
                  rx={20}
                  xml={placeholderIcon(item.type)}
                />
              )}
              <SvgXml
                width={width}
                height={height}
                style={absolutPos}
                xml={squircleBGMoon(backgroundColor)}
              />
              <SvgXml
                width={width}
                height={height}
                style={absolutPos}
                rx={20}
                xml={squirlce_border_moon(borderColor)}
              />
            </View>
          );
        } else {
          return (
            <View style={viewContainerStyle(index)}>
              {extraCount > 0 ? (
                <View
                  style={[styles.userIcon, { width: width, height: height }]}
                >
                  <Text style={[styles.extraCountStyle, extraCountStyle]}>
                    + {extraCount}
                  </Text>
                  <SvgXml
                    width={width}
                    height={height}
                    style={absolutPos}
                    rx={20}
                    xml={squirlce_border(borderColor)}
                  />
                  <SvgXml
                    width={width}
                    height={height}
                    style={absolutPos}
                    rx={20}
                    xml={squircleBG("white")}
                  />
                </View>
              ) : (
                <>
                  {isImageAcceptable(item.uri) ? (
                    <FastImage
                      style={[
                        styles.userIcon,
                        { width: width, height: height },
                      ]}
                      source={{
                        uri: item.uri,
                        priority: FastImage.priority.low,
                      }}
                      resizeMode={FastImage.resizeMode.stretch}
                    />
                  ) : (
                    <SvgXml
                      fill={"#ffffff"}
                      style={[
                        styles.userIcon,
                        { width: width, height: height },
                      ]}
                      width={width}
                      height={height}
                      rx={20}
                      xml={placeholderIcon(item.type)}
                    />
                  )}
                  <SvgXml
                    width={width}
                    height={height}
                    style={absolutPos}
                    rx={20}
                    xml={squircleBG(backgroundColor)}
                  />
                  <SvgXml
                    width={width}
                    height={height}
                    style={absolutPos}
                    rx={20}
                    xml={squirlce_border(borderColor)}
                  />
                </>
              )}
            </View>
          );
        }
      })}
    </View>
  );
};
export default RoomIcon;
