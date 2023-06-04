import AsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

const asyncOperationOnAsyncStorage = async () => {
  await AsyncStorage.setItem("currentUser", "Alberto");
};

it("checks if Async Storage is used", async () => {
  await asyncOperationOnAsyncStorage();
  const item = await AsyncStorage.getItem("currentUser");

  expect(item).toBe( "Alberto" );
});