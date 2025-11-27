import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HearingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Main Features</Text>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </View>

        {/* ----- GRID SECTION ----- */}

        <View style={styles.grid}>

          {/* 1. Live Speech to Text */}
          <TouchableOpacity style={styles.box}>
            <Ionicons name="mic-outline" size={38} color="#48A8FF" />
            <Text style={styles.boxText}>Live Speech → Text</Text>
          </TouchableOpacity>

          {/* 2. Multi-language Transcription */}
          <TouchableOpacity style={styles.box}>
            <MaterialCommunityIcons name="translate" size={38} color="#48A8FF" />
            <Text style={styles.boxText}>Multi‑language{"\n"}Transcription</Text>
          </TouchableOpacity>

          {/* 3. Save Notes */}
          <TouchableOpacity style={styles.box}>
            <Ionicons name="document-text-outline" size={38} color="#48A8FF" />
            <Text style={styles.boxText}>Save Notes</Text>
          </TouchableOpacity>

          {/* 4. Export to PDF */}
          <TouchableOpacity style={styles.box}>
            <Ionicons name="document-outline" size={38} color="#48A8FF" />
            <Text style={styles.boxText}>Export to PDF</Text>
          </TouchableOpacity>

          {/* 5. Emergency Alerts */}
          <TouchableOpacity style={styles.box}>
            <Ionicons name="alert-circle-outline" size={38} color="#48A8FF" />
            <Text style={styles.boxText}>Emergency{"\n"}Alerts</Text>
          </TouchableOpacity>

          {/* 6. Sign Language Avatar */}
          <TouchableOpacity style={styles.box}>
            <MaterialCommunityIcons name="hand-pointing-left" size={38} color="#48A8FF" />
            <Text style={styles.boxText}>Sign Language{"\n"}Avatar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* ----- Live Caption Bar ----- */}
      <View style={styles.captionBar}>
        <Text style={styles.captionText}>
          Welcome to your Accessibility Assistant. Live captions will appear here...
        </Text>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#06131F",
  },

  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  box: {
    width: "47%",
    backgroundColor: "#0B2234",
    paddingVertical: 25,
    borderRadius: 18,
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  boxText: {
    marginTop: 10,
    color: "#E6F2FF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
  },

  captionBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#0B2234",
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  captionText: {
    color: "#A9C7E8",
    fontSize: 13,
  },
});
