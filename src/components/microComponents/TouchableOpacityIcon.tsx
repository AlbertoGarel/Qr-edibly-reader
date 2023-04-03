import { TouchableOpacity, View, Text, Image, ImageURISource, ImageRequireSource } from "react-native";
import { padding, styles_sheet } from "../../constants/styles_sheet";

type Props = {
  src_image: ImageURISource | ImageURISource[] | ImageRequireSource,
  image_height: number,
  image_width: number,
  margin: number,
  _onPress: () => void
}

const TouchableOpacityicon = ({ src_image, image_height, image_width, margin, _onPress }: Props) => {

  return (
    <TouchableOpacity onPress={_onPress} style={{margin: margin}}>
      <View style={{ width: image_width , height: image_height , ...styles_sheet.centerCenter}}>
        <Image source={src_image} resizeMode="contain" style={{ width: image_width, height: image_height }} />
      </View>
    </TouchableOpacity>
  );
};

export default TouchableOpacityicon;