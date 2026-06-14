import { api } from '../../src/services/api';
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/Header";
import Button from "../../src/components/Button";

export default function RegistrarConfinamento() {
  const [foto, setFoto] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [observacoes, setObservacoes] = useState("");

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
      obterLocalizacao();
    }
  };

  const obterLocalizacao = async () => {
  try {
    const Location = await import("expo-location");
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;
    const loc = await Location.getCurrentPositionAsync({});
    setLatitude(loc.coords.latitude.toFixed(4));
    setLongitude(loc.coords.longitude.toFixed(4));
  } catch {
    setLatitude("N/A");
    setLongitude("N/A");
  }
};

  const confirmarRegistro = async () => {
  try {
    await api.confinamento.criar({
      foto: foto ?? undefined,
      latitude: latitude ?? undefined,
      longitude: longitude ?? undefined,
      observacoes,
    });
    alert('Confinamento registrado com sucesso!');
    router.replace('/sinistro');
  } catch (error) {
    alert('Erro ao registrar confinamento. Tente novamente.');
  }
};

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.screenTitle}>Registrar Ponto de Confinamento</Text>

        {/* Área de foto */}
        {foto ? (
          <Image source={{ uri: foto }} style={styles.fotoPreview} />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Ionicons name="image-outline" size={64} color="#ccc" />
          </View>
        )}

        {/* Coordenadas GPS */}
        <View style={styles.gpsRow}>
          <Ionicons name="location-outline" size={20} color="#2d6a2d" />
          <Text style={styles.gpsText}>
            Latitude: {latitude ?? "--"}
          </Text>
          <Text style={styles.gpsText}>
            Longitude: {longitude ?? "--"}
          </Text>
        </View>

        {/* Botões Tirar Foto e Cancelar */}
        <View style={styles.botoesRow}>
          <TouchableOpacity style={styles.botaoFoto} onPress={tirarFoto}>
            <Ionicons name="camera-outline" size={20} color="#fff" />
            <Text style={styles.botaoFotoText}>Tirar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={() => router.back()}
          >
            <Ionicons name="close-circle-outline" size={20} color="#888" />
            <Text style={styles.botaoCancelarText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        {/* Observações */}
        <Text style={styles.label}>Observações (Opcional)</Text>
        <TextInput
          style={styles.textarea}
          multiline
          maxLength={500}
          placeholder="Digite suas observações aqui..."
          placeholderTextColor="#aaa"
          value={observacoes}
          onChangeText={setObservacoes}
        />
        <Text style={styles.contador}>{observacoes.length} / 500</Text>

        {/* Botão Confirmar */}
        <Button title="Confirmar Registro" onPress={confirmarRegistro} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  content: { padding: 16, gap: 8, paddingBottom: 40 },
  screenTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e4d1e",
    marginBottom: 12,
    marginTop: 4,
  },
  fotoPreview: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 8,
  },
  fotoPlaceholder: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  gpsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    gap: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  gpsText: {
    fontSize: 14,
    color: "#333",
  },
  botoesRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },
  botaoFoto: {
    flex: 1,
    backgroundColor: "#2d6a2d",
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  botaoFotoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  botaoCancelarText: {
    color: "#888",
    fontWeight: "bold",
    fontSize: 15,
  },
  label: { fontWeight: "bold", fontSize: 15, marginTop: 12, marginBottom: 6 },
  textarea: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    height: 120,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#333",
  },
  contador: { textAlign: "right", color: "#aaa", fontSize: 12, marginTop: 4 },
});