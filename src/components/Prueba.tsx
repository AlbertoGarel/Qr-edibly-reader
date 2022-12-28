import {StyleSheet, View, Text, Pressable } from 'react-native';
import {connect} from "react-redux";
import {AppState, UserListState} from "../store/types";
import {addUser} from "../store/user-list/actions";
import {Dispatch} from "redux";

type Props = {
    users: UserListState,
    onAddUser: (name: string, surename: string, age: number) => void;
}

const Prueba = ({users, onAddUser}: Props) => {

    return (
        <View>
            <Pressable style={styles.button} onPress={() => onAddUser('Antonio', 'Gutierrez', 50)}>
                <Text style={styles.text}>Press to add</Text>
            </Pressable >
                {
                    users ?
                        users.map((i, index) => {
                            return <Text key={index}>{i.name}</Text>
                        })
                        :
                        <Text>no hay personas</Text>

                }
        </View>
    )
};

const mapStateToProps = (state: AppState) => ({
    users: state.userList
});
const mapDipatchToProps = (dispatch: Dispatch) => ({
    onAddUser: (name: string, surname: string, age: number) => {
        dispatch(addUser(name, surname, age));
    },
    // other callbacks go here...
});

export default connect(
    mapStateToProps,
    mapDipatchToProps
)(Prueba);

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#1B97F3',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});