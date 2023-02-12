import { useState } from "react";
import { StyleSheet } from "react-native";
import DatePicker from "react-native-date-ranges";

export default DateRangePicker = ({ onSelect, startDate, endDate }) => {
  const [min, setMin] = useState(startDate);
  const [max, setMax] = useState(endDate);

  const onConfirm = ({ startDate, endDate }) => {
    setMin(new Date(startDate));
    setMax(new Date(endDate));
    onSelect({ startDate, endDate });
  };

  return (
    <DatePicker
      style={styles.picker}
      customStyles={{
        placeholderText: { fontSize: 14, color: "#000", fontWeight: "bold" },
      }}
      centerAlign
      placeholder={
        min.toLocaleDateString("ru-RU") +
        " → " +
        max.toLocaleDateString("ru-RU")
      }
      onConfirm={onConfirm}
      mode={"range"}
      markText={""}
      buttonText={"OK"}
      maxDate={new Date()}
    />
  );
};

const styles = StyleSheet.create({
  picker: { height: 50, width: "100%", alignSelf: "center", borderWidth: 0 },
});
