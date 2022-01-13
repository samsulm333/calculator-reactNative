import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [resultText, setResultText] = useState("");
  const [calcText, setCalctext] = useState("");

  // make state for the element
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "="];
  const operatorButtons = ["DEL", "AC", "/", "*", "-", "+"];

  // calculate result function using eval javascript module
  const calculation = () => {
    setCalctext(eval(resultText));
  };

  // add / join element into resultText state
  const onButtonClick = (text) => {
    if (text === "=") {
      return calculation();
    }
    setResultText(resultText + text);
  };

  const onOperationClick = (text) => {
    let operators = ["DEL", "+", "-", "*", "/"];
    if (text == "AC") {
      setResultText("");
      setCalctext(0);
      return;
    }
    if (text == "DEL") {
      setResultText(resultText.toString().substring(0, resultText.length - 1));
      return;
    }

    const lastResultText = resultText.toString().split("").pop();
    if (operators.includes(lastResultText)) return;

    setResultText(resultText + text);
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.result}>
        <Text style={styles.resultText}>{calcText}</Text>
      </View>

      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{resultText}</Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.row}>
          {numbers.map((number) => (
            <TouchableOpacity
              style={styles.numberWrapp}
              key={number}
              onPress={() => {
                onButtonClick(number);
              }}
            >
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* operations */}

        <View style={styles.operations}>
          {operatorButtons.map((operator) => (
            <TouchableOpacity
              key={operator}
              onPress={() => {
                onOperationClick(operator);
              }}
            >
              <Text style={styles.operationButtons}>{operator}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    backgroundColor: "grey",
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  resultText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  calculation: {
    flex: 1,
    backgroundColor: "#d6d6c2",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  calculationText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  buttons: {
    flex: 7,
    flexDirection: "row",
  },

  operations: {
    backgroundColor: "#636363",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  // buttons
  row: {
    backgroundColor: "#434343",
    flexDirection: "row",
    flex: 3,
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  numberWrapp: {
    width: "30%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: "white",
    fontSize: 30,
  },
  operationButtons: {
    color: "white",
    fontSize: 30,
  },
});
