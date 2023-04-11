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
import { changeStateFavourite, deleteByDateFavourite, deleteFavourite } from "../store/favourites/actions";
import { History } from "../store/types";
import ImageNoResults from "../components/ImageNoresults";
import i18n from "../translate";

type Props = {
  navigation: ReactNavigation.RootParamList
  onDeleteFavouriteByDate: React.Dispatch<string>
  favourites: History[]
  onCHangeStateReduxFavourite: React.Dispatch<History>
  onDeleteFavourite: React.Dispatch<string> | null
  filterValue: number
}

const FavouriteScreen = ({
                           navigation,
                           onDeleteFavouriteByDate,
                           favourites,
                           onCHangeStateReduxFavourite,
                           onDeleteFavourite,
                           filterValue
                         }: Props) => {

  const { dark, colors } = useTheme();
  const image_no_Favorite: ImageURISource | ImageURISource[] = dark ? require("../assets/images/no_favourite_light.png") : require("../assets/images/no_favourite_dark.png");
  const image_no_records: ImageURISource | ImageURISource[] = dark ? require("../assets/images/no_search_light.png") : require("../assets/images/no_search_dark.png");

  const [sectionListData, setSectionListData] = React.useState([]);

  function oderedTimeItems() {
    const sectionData: object[] = orderedDataSectionList(favourites, "date", "hour");
    // ordederd for most recently date.
    setSectionListData(sectionData.reverse());
  }

  function HandlerDeleteFavoriteByDate(param: string) {
    onDeleteFavouriteByDate(param);
  }

  React.useEffect((): () => void => {
    let isMounted = true;
    if (isMounted) {
      // orederd for most recently date and serach by type if filterValue exist
      filterValue > 0
        ? setSectionListData(filterTypeContent(favourites, filterValue))
        : oderedTimeItems();
    }

    return () => isMounted = false;
  }, [favourites, filterValue]);

  if (!sectionListData.length && favourites.length) {
    //  NO  RECORDS FOUND BY KEY
    return <ImageNoResults text={i18n.t("contextual.no_searchresult")}
                           image={image_no_records} />;
  }

  if (!favourites.length) {
    //  NO RECODRS LENGTH
    return <ImageNoResults text={i18n.t("contextual.first_favourite")}
                           image={image_no_Favorite} />;
  }

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background, marginHorizontal: padding / 2 }}>
      <SectionList
        sections={sectionListData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <SectionCardItem item={item}
                                                   navigation={navigation}
                                                   onDeleteItemById={null}
                                                   addFavouriteFunction={onCHangeStateReduxFavourite}
                                                   deleteFavouriteFunction={onDeleteFavourite}

        />}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} onDeleteHistoryByDate={() => HandlerDeleteFavoriteByDate(title)} />
        )}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: AppState) => ({
  favourites: state.usedFauvorites
});

const mapDipatchToProps = (dispatch: Dispatch) => ({
  onCHangeStateReduxFavourite: (favourite: History) => {
    dispatch(changeStateFavourite(favourite));
  },
  onDeleteFavourite: (id: string) => {
    dispatch(deleteFavourite(id));
  },
  onDeleteFavouriteByDate: (id: string) => {
    dispatch(deleteByDateFavourite(id));
  }
  // other callbacks go here...
});

export default connect(
  mapStateToProps,
  mapDipatchToProps
)(FavouriteScreen);

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