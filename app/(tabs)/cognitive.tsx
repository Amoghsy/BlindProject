import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const SIMPLE_WORDS_MAP: Record<string, string> = {
  approximately: "about",
  utilize: "use",
  however: "but",
  therefore: "so",
  nevertheless: "still",
  numerous: "many",
  sufficient: "enough",
  participate: "join",
  purchase: "buy",
  commence: "start",
  complicated: "hard",
  difficult: "hard",
};

function simplifySentence(sentence: string) {
  return sentence
    .split(" ")
    .map((word) => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, "");
      if (SIMPLE_WORDS_MAP[clean]) {
        // keep punctuation but swap root word
        return word.replace(new RegExp(clean, "i"), SIMPLE_WORDS_MAP[clean]);
      }
      return word;
    })
    .join(" ");
}

function summarizeText(text: string) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) return "";

  if (sentences.length <= 2) return sentences.join(" ");

  // simple summary: first + most informative middle sentence
  const first = sentences[0];
  const middle = sentences[Math.floor(sentences.length / 2)];
  return `${first} ${middle}`;
}

export default function CognitiveScreen() {
  const [inputText, setInputText] = useState("");
  const [simplifiedText, setSimplifiedText] = useState("");
  const [summaryText, setSummaryText] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState(3); // default highlight
  const [tasks, setTasks] = useState([
    { label: "Morning Medication", done: true },
    { label: "30‑min walk", done: false },
  ]);

  const weekLabels = ["S", "M", "T", "W", "T", "F", "S"];

  // --- HANDLERS ---

  const handleSimplify = () => {
    if (!inputText.trim()) {
      setSimplifiedText("Enter some text above to simplify.");
      return;
    }

    const sentences = inputText
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const simplified = sentences
      .map((s) => simplifySentence(s))
      .map((s) => {
        // make very long sentences shorter
        if (s.split(" ").length > 20) {
          const parts = s.split(" ");
          return parts.slice(0, 15).join(" ") + "...";
        }
        return s;
      })
      .join(" ");

    setSimplifiedText(simplified);
  };

  const handleSummary = () => {
    if (!inputText.trim()) {
      setSummaryText("Enter some text above to generate a summary.");
      return;
    }
    const base = simplifiedText.trim() || inputText.trim();
    const summary = summarizeText(base);
    setSummaryText(summary || "Could not find enough content to summarize.");
  };

  const handleDayPress = (index: number) => {
    setSelectedDayIndex(index);
  };

  const handleToggleTask = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Ionicons name="person-circle-outline" size={30} color="#fff" />
        </View>

        {/* TEXT SIMPLIFIER CARD */}
        <View style={[styles.card, { marginBottom: 16 }]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBoxBlue}>
              <Text style={styles.iconLetter}>A</Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardTitle}>Text Simplifier</Text>
              <Text style={styles.cardSubtitle}>Make text easier to read</Text>
            </View>
          </View>

          <View style={styles.textBoxWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter text to simplify..."
              placeholderTextColor="#64748B"
              multiline
              value={inputText}
              onChangeText={setInputText}
            />
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={handleSimplify}>
            <Text style={styles.actionButtonText}>Simplify Text</Text>
          </TouchableOpacity>

          <View style={styles.outputBox}>
            <Text style={styles.outputText}>
              {simplifiedText || "Simplified text will appear here."}
            </Text>
          </View>
        </View>

        {/* TEXT SUMMARY CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: "#05966920" }]}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={22}
                color="#22C55E"
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardTitle}>Text Summary</Text>
              <Text style={styles.cardSubtitle}>Get the key points quickly</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={handleSummary}>
            <Text style={styles.actionButtonText}>Generate Summary</Text>
          </TouchableOpacity>

          <View style={styles.outputBox}>
            <Text style={styles.outputText}>
              {summaryText || "Your summary will be generated here."}
            </Text>
          </View>
        </View>

        {/* ROUTINE SCHEDULER */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: "#7C3AED20" }]}>
              <Ionicons name="calendar-outline" size={22} color="#A855F7" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardTitle}>Routine Scheduler</Text>
              <Text style={styles.cardSubtitle}>Organize your day</Text>
            </View>
          </View>

          <View style={styles.weekRow}>
            {weekLabels.map((d, i) => (
              <TouchableOpacity
                key={i}
                style={styles.weekItem}
                onPress={() => handleDayPress(i)}
              >
                <Text style={styles.weekLabel}>{d}</Text>
                <View
                  style={[
                    styles.dayBubble,
                    i === selectedDayIndex && styles.dayBubbleActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumber,
                      i === selectedDayIndex && styles.dayNumberActive,
                    ]}
                  >
                    {28 + i}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* TO‑DO CHECKLIST */}
        <View style={[styles.card, { marginBottom: 90 }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: "#EA580C20" }]}>
              <Ionicons
                name="checkmark-done-outline"
                size={22}
                color="#FB923C"
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.cardTitle}>To‑do Checklist</Text>
              <Text style={styles.cardSubtitle}>Manage your daily tasks</Text>
            </View>
          </View>

          {tasks.map((task, index) => (
            <View style={styles.taskRow} key={task.label}>
              <Text style={styles.taskText}>{task.label}</Text>

              <TouchableOpacity
                style={[
                  styles.toggle,
                  task.done && styles.toggleActive,
                ]}
                onPress={() => handleToggleTask(index)}
              >
                {task.done && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomText}>
          Welcome to your Accessibility Assistant.
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
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  card: {
    backgroundColor: "#0B2234",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconBoxBlue: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#2563EB33",
    alignItems: "center",
    justifyContent: "center",
  },
  iconLetter: {
    color: "#60A5FA",
    fontWeight: "700",
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  cardSubtitle: {
    color: "#93AEC9",
    fontSize: 12,
    marginTop: 2,
  },

  textBoxWrapper: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1F2A3A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 4,
  },
  textInput: {
    minHeight: 70,
    color: "#E5F0FF",
    fontSize: 14,
  },

  actionButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  outputBox: {
    marginTop: 10,
    backgroundColor: "#071520",
    borderRadius: 12,
    padding: 10,
  },
  outputText: {
    color: "#C4D4EA",
    fontSize: 13,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  weekItem: {
    alignItems: "center",
    flex: 1,
  },
  weekLabel: {
    color: "#93AEC9",
    fontSize: 11,
    marginBottom: 4,
  },
  dayBubble: {
    width: 30,
    height: 30,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1F2A3A",
    alignItems: "center",
    justifyContent: "center",
  },
  dayBubbleActive: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  dayNumber: {
    color: "#C4D4EA",
    fontSize: 12,
  },
  dayNumberActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  taskText: {
    color: "#E5F0FF",
    fontSize: 14,
  },
  toggle: {
    width: 26,
    height: 26,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#4B5563",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#0B2234",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  bottomText: {
    color: "#A9C7E8",
    fontSize: 13,
  },
});
