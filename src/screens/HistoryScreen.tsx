import { StyleSheet, SafeAreaView, SectionList, ImageURISource } from "react-native";
import { connect } from "react-redux";
import { AppState } from "@App/store/types";
import React from "react";
import { filterTypeContent, orderedDataSectionList } from "../utils/utils";
import SectionHeader from "../components/microComponents/sectionList/SectionHeader";
import { useTheme } from "@react-navigation/native";
import { padding } from "../constants/styles_sheet";
import SectionCardItem from "../components/microComponents/sectionList/SectionCardItem";
import { Dispatch } from "redux";
import { deleteByDate, deleteHistory } from "../store/history/actions";
import { changeStateFavourite, deleteFavourite } from "../store/favourites/actions";
import { History } from "../store/types";
import ImageNoResults from "../components/ImageNoresults";
import i18n from "../translate";

type Props = {
  navigation: ReactNavigation.RootParamList
  onDeleteHistoryByDate: React.Dispatch<string>
  history: History[]
  onCHangeStateReduxFavourite: React.Dispatch<History>
  onDeleteFavourite: React.Dispatch<string>
  onDeleteItemById: React.Dispatch<string>
  filterValue: number
}

const HistoryScreen = ({
                         navigation,
                         onDeleteHistoryByDate,
                         history,
                         onCHangeStateReduxFavourite,
                         onDeleteFavourite,
                         onDeleteItemById,
                         filterValue
                       }: Props) => {
  const { dark, colors } = useTheme();
  const image_no_history: ImageURISource | ImageURISource[] = dark ? require("../assets/images/no_last_search_ligth.png") : require("../assets/images/no_last_search_dark.png");
  const image_no_records: ImageURISource | ImageURISource[] = dark ? require("../assets/images/no_search_light.png") : require("../assets/images/no_search_dark.png");

  const [sectionListData, setSectionListData] = React.useState([]);

  function oderedTimeItems() {
    const sectionData = orderedDataSectionList(history, "date", "hour");
    // ordederd for most recently date.
    setSectionListData(sectionData.reverse());
  }

  function HandlerDeleteByDate(param: string) {
    onDeleteHistoryByDate(param);
  }

  React.useEffect((): () => void => {
    let isMounted = true;

    if (isMounted) {
      // orederd for most recently date and serach by type if filterValue exist
      filterValue > 0
        ? setSectionListData(filterTypeContent(history, filterValue))
        : oderedTimeItems();
    }

    return () => isMounted = false;
  }, [history, filterValue]);

  if (!sectionListData.length && history.length) {
    //  NO  RECORDS FOUND BY KEY
    return <ImageNoResults text={i18n.t("contextual.no_searchresult")}
                           image={image_no_records} />;
  }

  if (!history.length) {
    //  NO RECODRS LENGTH
    return <ImageNoResults text={i18n.t("contextual.first_search")}
                           image={image_no_history} />;
  }

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background, marginHorizontal: padding / 2 }}>
      <SectionList
        sections={sectionListData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <SectionCardItem item={item}
                                                   navigation={navigation}
                                                   onDeleteItemById={onDeleteItemById}
                                                   addFavouriteFunction={onCHangeStateReduxFavourite}
                                                   deleteFavouriteFunction={onDeleteFavourite}

        />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} onDeleteHistoryByDate={() => HandlerDeleteByDate(title)} />
        )}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: AppState) => ({
  history: state.usedHistory
});

const mapDipatchToProps = (dispatch: Dispatch) => ({
  onDeleteHistoryByDate: (date: string) => {
    dispatch(deleteByDate(date));
  },
  onCHangeStateReduxFavourite: (favourite: History) => {
    dispatch(changeStateFavourite(favourite));
  },
  onDeleteFavourite: (id: string) => {
    dispatch(deleteFavourite(id));
  },
  onDeleteItemById: (id: string) => {
    dispatch(deleteHistory(id));
  }
  // other callbacks go here...
});

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(HistoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: padding
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});