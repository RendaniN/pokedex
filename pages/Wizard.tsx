import React, { useState } from "react";
import { View, Button, StyleSheet, Platform, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import Stepper from "react-native-stepper-ui";
import Background from "../components/Background/Background";
import Logo from "../components/Logo/Logo";
import DatePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Main from "./Main";
import { SyntheticInputEvent } from "react-number-format";

export function navigate(arg0: string) {
  throw new Error("Function not implemented.");
}

const Wizard = () => {
  const [active, setActive] = useState(0);
  const [name, setName] = useState({ value: "", error: "" });
  const nameError = nameValidator(name.value);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
  const navigation = useNavigation();

  const handleNameInput = (e: SyntheticInputEvent) => {
    if (e.nativeEvent.text) {
      const name = e.nativeEvent.text.toString();
      setName({ value: name, error: nameError });
      setActive((p) => p + 1)
    }
  };

  const Page1 = () => {
    return (
      <View>
         <TextInput
          clearButtonMode={"always"} 
          placeholder={"Search"}
          onSubmitEditing={ (e) => handleNameInput(e) }
          returnKeyType={"search"}
          placeholderTextColor={'black'}
          style={styles.searchfeild}
          editable
        />
      </View>
    );
  };
  const Page2 = () => {
    const onChange = (event, selectedDate) => {
      if (event.type === "dismissed") {
        Alert.alert(
          "picker was dismissed",
          undefined,
          [
            {
              text: "great",
            },
          ],
          { cancelable: true }
        );
        return;
      }

      if (event.type === "neutralButtonPressed") {
        setDate(new Date(0));
      } else {
        setDate(selectedDate);
      }
    };
    return (
      <View>
        <DatePicker
          style={styles.datePickerStyle}
          value={date}
          mode="date"
          onChange={onChange}
        />
      </View>
    );
  };

  const content = [<Page1 />, <Page2 />];

  function nameValidator(name: string) {
    if (!name) return "Name can't be empty.";
    return "";
  }

  function submitName() {
    if (nameError) {
      alert(nameError);
      setName({ value: "", error: nameError });
      return;
    } else {
      setActive((p) => p + 1);
    }
  }

  const onFinish = () => {
    try {
      // AsyncStorage.setItem("@UserName", name.value);
      // AsyncStorage.setItem("@DOB", date);
      navigation.navigate(Main, "Main");
      // setActive((p) => p + 2);
    } catch (e) {
      console.error("Error Saving Details");
    }
  };

  return (
    <Background>
      <Logo style={{}} />
      <View style={{ marginVertical: 10, marginHorizontal: 50 }}>
        <Stepper
          active={active}
          content={content}
          showButton
          buttonStyle={{
            marginTop: 100,
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            marginHorizontal: 25,
          }}
          wrapperStyle={{
            flexDirection: "column",
            alignSelf: "center",
            justifyContent: "center",
            width: "100%",
            borderBottomColor: "red",
          }}
          stepStyle={{ display: "none" }}
          onBack={() => setActive((p) => p - 1)}
          onFinish={() => onFinish()}
          onNext={() => submitName()}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  searchfeild: {
    height: 40,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: 'center',
    color: 'black',
    backgroundColor: '#fff',
    maxWidth: '80%',
    minWidth: '80%',
    borderRadius: 5,
    alignSelf: 'center'
  },
});

export default Wizard;
