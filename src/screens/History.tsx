import { View, Text } from "react-native";
import { connect } from "react-redux";
import { AppState } from "@App/store/types";

const History = ({history}) => {

  return (
    <Text>{JSON.stringify(history)}</Text>
  );
};

const mapStateToProps = (state: AppState) => ({
  history: state.usedHistory
});

export default connect(
  mapStateToProps
)(History);