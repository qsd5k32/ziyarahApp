import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
 
export default function ImageButton({ title, description, onPress }) {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.imageButton}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
    imageButton: {
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
        height: "30%",
        position: "absolute",
        bottom: 0,
        left: 0,
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      },
      description: {
        fontSize: 16,
        marginVertical: 3,
        color: "white",
        textAlign: "center",
      },
    })