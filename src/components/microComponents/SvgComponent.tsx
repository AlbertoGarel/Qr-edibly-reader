import React from "react";
import { SvgXml } from "react-native-svg";
import { ImageURISource } from "react-native";

interface Props {
  svgData: ImageURISource | ImageURISource[]
  svgWidth: number
  svgHeight: number
  color: string
}

function SvgComponent({
                        svgData, svgWidth, svgHeight, color = "#000000"
                      }: Props) {
  const svgContent = svgData;

  const ToSVGXML = () => <SvgXml xml={svgContent.toString()} width={svgWidth}
                                 height={svgHeight} fill={color} />;
  return <ToSVGXML />;
}

export default SvgComponent;