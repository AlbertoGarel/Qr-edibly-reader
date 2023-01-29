import * as React from "react";
import { StyleSheet, View, Text, Pressable, Button, Image, ImageBackground, Animated } from "react-native";
import { connect } from "react-redux";
import { AppState, UserListState } from "../store/types";
import { addUser } from "../store/user-list/actions";
import { Dispatch } from "redux";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/expoConstants";
import { styles_sheet } from "../constants/styles_sheet";
import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import { barcodeFormat, BarcodeValueTypes } from "../constants/barcodes_values";

// type Props = {
//     navigation?: any,
//     users: UserListState,
//     onAddUser: (name: string, surename: string, age: number) => void;
// }

type Props = {
  productId, imageData: object
}

// const Prueba = ({users, onAddUser, navigation}: Props) => {
const Prueba = ({ route }) => {
  const { colors } = useTheme();
  const finderWidth: number = WINDOW_WIDTH - (WINDOW_WIDTH / 6);
  const finderHeight: number = WINDOW_HEIGHT / 2;
  const zoomAnim = React.useRef(new Animated.Value(0)).current;

  function identify_code(data) {
    console.log('data', data)
    alert(data.length)
    const code_data = {};
    const code_format = barcodeFormat.filter((item, index) => Object.values(item)[0] === data.format);
    const format = Object.keys(code_format[0])[0];
    // Add property to object
    code_data['format'] = format;
    code_data['content'] = data.content;

    if (format === "QR_CODE") {
      // console.log('data.content.', data.content)
      const type_qr = data.content.type;
      const name_type = BarcodeValueTypes.filter(name => Object.values(name)[0] === type_qr);
      // Add property to object
      code_data['type_qr'] = Object.keys(name_type[0])[0];
    }
    // console.log("code_data", code_data);
    return code_data;
  }

  useEffect(() => {
    // console.log("route.params.code", route.params.code);
    // console.log("route.params.imageData", route.params.imageData);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
      <View style={[{
        overflow: "hidden",
        width: 150,
        height: 150
      }, styles_sheet.centerCenter]}>
        <Image source={{ uri: "file://" + route.params.imageData.path }}
          // resizeMethod='scale'
               onError={({ nativeEvent: { error } }) => console.log(error)}
               style={{
                 width: "100%",
                 height: "100%",
                 resizeMode: "cover"
                 // transform: [{scale: .5}],
               }} />
      </View>
      {/*<Text style={{fontSize: 20, color: 'white'}}>{route.props.params.productId}</Text>*/}
      <Text style={{ fontSize: 20, color: "white" }}>props: {JSON.stringify(route.params.imageData)}</Text>
      <Text style={{ fontSize: 20, color: "white" }}>type: {JSON.stringify(identify_code(route.params.code[0]))}</Text>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  users: state.userList
});
const mapDipatchToProps = (dispatch: Dispatch) => ({
  onAddUser: (name: string, surname: string, age: number) => {
    dispatch(addUser(name, surname, age));
  }
  // other callbacks go here...
});

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(Prueba);

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#1B97F3"
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white"
  }
});

const response_object = [
  {
    "boundingBox": {
      "bottom": 851,
      "left": 194,
      "right": 614,
      "top": 469
    },
    "content": {
      "data": {
        "title": "",
        "url": "https://socialpymesvlc.es/"
      },
      "type": 8
    },
    "cornerPoints": [
      {
        "x": 194,
        "y": 469
      },
      {
        "x": 614,
        "y": 479
      },
      {
        "x": 576,
        "y": 851
      },
      {
        "x": 207,
        "y": 837
      }
    ],
    "displayValue": "https://socialpymesvlc.es/",
    "format": 256,
    "rawValue": "https://socialpymesvlc.es/"
  }
];


{/*<Pressable style={styles.button} onPress={() => onAddUser('Antonio', 'Gutierrez', 50)}>*/
}
{/*    <Text style={styles.text}>Press to add</Text>*/
}
{/*</Pressable >*/
}
{/*    {*/
}
{/*        users ?*/
}
{/*            users.map((i, index) => {*/
}
{/*                return <Text key={index}>{i.name}</Text>*/
}
{/*            })*/
}
{/*            :*/
}
{/*            <Text>no hay personas</Text>*/
}