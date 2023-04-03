import { View, Text } from "react-native";
import { connect } from "react-redux";
import { AppState } from "@App/store/types";

const Favourites = ({ favourite }) => {

  const sectionlistOrderedItems = (data) => {
    const ordered = data.reduce((acc, item) => {
      const _date = item.date;
      acc[_date]
        ? acc[_date].push(item)
        : acc[_date] = [item];
      return acc;
    }, []);
  };

  return (
    <View>
      {
        favourite && favourite.map((i, index) => {
          return (
            <Text key={index}>{JSON.stringify(i)}</Text>
          );
        })
      }
    </View>
  );
};

const mapStateToProps = (state: AppState) => ({
  favourite: state.usedFauvorites
});

export default connect(
  mapStateToProps
)(Favourites);