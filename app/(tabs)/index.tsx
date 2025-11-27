import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Simple Login Authentication (local only)
  const handleLogin = () => {
  const defaultUser = "user@example.com";
  const defaultPass = "123456";

  if (!email.trim() || !password.trim()) {
    alert("Please enter Email and Password");
    return;
  }

  if (email === defaultUser && password === defaultPass) {
    setLoggedIn(true);
  } else {
    alert("Invalid Email or Password");
  }
};
  // ---------------------------------------------------------
  // 1️⃣ LOGIN SCREEN FIRST
  // ---------------------------------------------------------
  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <StatusBar backgroundColor="#04070F" barStyle="light-content" />
        <Text style={styles.loginTitle}>Welcome to TriSense</Text>
        <Text style={styles.loginSub}>Accessible AI Assistance for All</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7a8ba6"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#7a8ba6"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>No account? Sign up (Coming Soon)</Text>
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------
  // 2️⃣ HOME UI AFTER LOGIN
  // ---------------------------------------------------------
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#04070F" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="eye-outline" size={22} color="#ffffff" />
          <Text style={styles.appName}>  TriSense</Text>
        </View>

        <Ionicons name="settings-outline" size={24} color="#ffffff" />
      </View>

      {/* AI Audio Chatbot */}
      <View style={styles.chatbotBox}>
        <MaterialCommunityIcons
          name="robot-outline"
          size={42}
          color="#FFFFFF"
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.chatbotTitle}>AI Audio Chatbot</Text>
        <Text style={styles.desc}>Tap the microphone to start a conversation</Text>

        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic" size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Assistance Tools */}
      <Text style={styles.sectionText}>Assistance Tools</Text>

      <TouchableOpacity style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="eye-outline" size={26} color="white" />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.cardTitle}>Blind Assistance</Text>
            <Text style={styles.smallText}>Describe images, read documents</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#ffffff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="ear-outline" size={26} color="white" />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.cardTitle}>Hearing Assistance</Text>
            <Text style={styles.smallText}>Live transcription, sound alerts</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#ffffff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="brain" size={26} color="white" />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.cardTitle}>Cognitive Assistance</Text>
            <Text style={styles.smallText}>Task reminders, simplified guides</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------------------- STYLES ---------------------- */
const styles = StyleSheet.create({
  /* LOGIN PAGE */
  loginContainer: {
    flex: 1,
    backgroundColor: "#04070F",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 6,
  },
  loginSub: {
    fontSize: 15,
    color: "#9aa8c7",
    textAlign: "center",
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#0B1220",
    color: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#1f2a3b",
  },
  loginBtn: {
    backgroundColor: "#3872F3",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 6,
  },
  loginText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  footerText: {
    color: "#7d8ca1",
    fontSize: 13,
    textAlign: "center",
    marginTop: 14,
  },

  /* HOME PAGE */
  container: { flex: 1, backgroundColor: "#04070F", paddingHorizontal: 18 },
  header: { marginTop: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  titleRow: { flexDirection: "row", alignItems: "center" },
  appName: { fontSize: 20, fontWeight: "700", color: "#FFFFFF", marginLeft: 8 },

  chatbotBox: {
    backgroundColor: "#0B1220",
    marginTop: 30,
    paddingVertical: 28,
    borderRadius: 18,
    alignItems: "center",
  },
  chatbotTitle: { fontSize: 20, color: "#fff", fontWeight: "700" },
  desc: { color: "#b3b9c9", marginTop: 5, fontSize: 14 },
  micButton: { marginTop: 15, backgroundColor: "#3872F3", padding: 16, borderRadius: 40 },

  sectionText: { color: "#A7B2D9", fontSize: 16, marginTop: 25, marginBottom: 10, fontWeight: "600" },
  card: { backgroundColor: "#0B1220", padding: 20, borderRadius: 16, marginBottom: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  row: { flexDirection: "row", alignItems: "center" },
  cardTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  smallText: { color: "#97A3C1", fontSize: 13, marginTop: 3 },
});
