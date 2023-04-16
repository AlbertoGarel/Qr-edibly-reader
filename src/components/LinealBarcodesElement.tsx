import { View } from "react-native";
import AnimationImage from "../components/AnimationImage";
import { useTheme } from "@react-navigation/native";
import { ADMOB_BANNER_HEIGHT, WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants/expoConstants";
import * as React from "react";
import TitleItem from "../components/TitleItem";
import DrawerIconsItem from "../components/DrawerIconsItem";
import ContentItem from "../components/ContentItem";
import { useHeaderHeight } from "@react-navigation/elements";
import { handler_linking_url } from "../utils/utils";
import { useEffect } from "react";
import { connect } from "react-redux";
import { AppState, History } from "@App/store/types";
import { Dispatch } from "redux";
import { addHistory } from "../store/history/actions";
import { barcodeFormat } from "../constants/barcodes_values";
import uuid from "react-native-uuid";
import { changeStateFavourite, deleteFavourite } from "../store/favourites/actions";

type Props = {
  onCHangeStateReduxFavourite: (redux_element: History) => void,
  image: any,
  data: any,
  redux_element: History,
  onAddHistory: (redux_element: History) => void
  onDeleteFavourite: (id_element: number[]) => void
  usedSattings: boolean
}

const LinealBarcodesElement = ({
                                 onDeleteFavourite,
                                 onAddHistory,
                                 onCHangeStateReduxFavourite,
                                 image,
                                 data,
                                 redux_element,
                                 usedSattings
                               }: Props) => {
  const { dark, colors } = useTheme();
  const headerHeight = useHeaderHeight();

  const [bookmark, setBookmark] = React.useState<boolean>(false);

  useEffect((): () => void => {
    let isMounted = true;

    if (image && isMounted && usedSattings) {
      // add history option conditional from setting options and exist image
      onAddHistory(redux_element);
    }

    return () => isMounted = false;
  }, []);

  function redux_bookmark_update(element_state, id) {
    setBookmark(element_state);
    if (element_state) {
      onCHangeStateReduxFavourite(redux_element);
    } else {
      onDeleteFavourite(id);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <TitleItem data={data} image={image} />
      <AnimationImage image={image}
                      element_id={redux_element.id}
                      bookmark={bookmark}
                      setBookmark={setBookmark}
                      redux_bookmark_update={redux_bookmark_update}
                      format_code={data.code[0].format}
      />
      <View style={{
        backgroundColor: colors.background,
        height: WINDOW_HEIGHT - headerHeight - WINDOW_WIDTH * .60 - ADMOB_BANNER_HEIGHT - 80,//recalculate
        flex: 1,
        borderTopRightRadius: 70
      }}>
        <DrawerIconsItem handler={handler_linking_url} data={data.code[0].rawValue}
                         drawicons={data.drawicons} />
        <ContentItem content={data.code[0].rawValue} />
      </View>
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  history: state.usedHistory,
  usedSattings: state.usedSettings[0].history
});

const mapDipatchToProps = (dispatch: Dispatch) => ({
  onCHangeStateReduxFavourite: (favourite: History) => {
    dispatch(changeStateFavourite(favourite));
  },
  onDeleteFavourite: (id: number[]) => {
    dispatch(deleteFavourite(id));
  },
  onAddHistory: (history: History) => {
    dispatch(addHistory(history));
  }
  // other callbacks go here...
});

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(LinealBarcodesElement);