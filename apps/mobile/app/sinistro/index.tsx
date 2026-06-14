import { api } from '../../src/services/api';
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../src/components/Header";
import Button from "../../src/components/Button";

const TIPOS_SINISTRO = [
  "Veículo Danificado",
  "Vidro Quebrado",
  "Acidente com Pedestre",
  "Queda de Árvore",
  "Dano ao Patrimônio",
  "Outros",
];

const CP_TRECHOS = [
  "Trecho A - Centro",
  "Trecho B - Norte",
  "Trecho C - Sul",
  "Trecho D - Leste",
  "Trecho E - Oeste",
];

export default function RegistrarSinistro() {
  const [foto, setFoto] = useState<string | null>(null);
  const [tipoSinistro, setTipoSinistro] = useState("");
  const [showTipos, setShowTipos] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [trecho, setTrecho] = useState("");
  const [showTrechos, setShowTrechos] = useState(false);
  const [buscaTrecho, setBuscaTrecho] = useState("");

  const trechosFiltrados = CP_TRECHOS.filter((t) =>
    t.toLowerCase().includes(buscaTrecho.toLowerCase())
  );

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  };

  const salvarSinistro = async () => {
  if (!tipoSinistro || !trecho) {
    alert('Preencha o tipo e o trecho do sinistro.');
    return;
  }
  try {
    await api.sinistro.criar({
      foto: foto ?? undefined,
      tipo: tipoSinistro,
      trecho,
      descricao,
    });
    alert('Sinistro registrado com sucesso!');
    router.back();
  } catch (error) {
    alert('Erro ao registrar sinistro. Tente novamente.');
  }
};

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Header />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Título da tela */}
        <Text style={styles.screenTitle}>Registrar Sinistro</Text>

        {/* Área de foto */}
        <TouchableOpacity style={styles.fotoArea} onPress={tirarFoto}>
          <Ionicons name="camera-outline" size={48} color="#2d6a2d" />
          <Text style={styles.fotoTitulo}>Tirar Foto do Sinistro</Text>
          <Text style={styles.fotoSubtitulo}>Toque para abrir a câmera</Text>
        </TouchableOpacity>

        {/* Tipo de Sinistro */}
        <Text style={styles.label}>Tipo de Sinistro</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowTipos(!showTipos)}
        >
          <Text style={tipoSinistro ? styles.dropdownValor : styles.dropdownPlaceholder}>
            {tipoSinistro || "Selecione o tipo de sinistro"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>
        {showTipos && (
          <View style={styles.dropdownLista}>
            {TIPOS_SINISTRO.map((tipo) => (
              <TouchableOpacity
                key={tipo}
                style={styles.dropdownItem}
                onPress={() => {
                  setTipoSinistro(tipo);
                  setShowTipos(false);
                }}
              >
                <Text>{tipo}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Descrição */}
        <Text style={styles.label}>Descrição Detalhada</Text>
        <TextInput
          style={styles.textarea}
          multiline
          maxLength={1000}
          placeholder="Descreva detalhadamente o ocorrido, incluindo local, data, hora e outras informações relevantes..."
          placeholderTextColor="#aaa"
          value={descricao}
          onChangeText={setDescricao}
        />
        <Text style={styles.contador}>{descricao.length} / 1000</Text>

        {/* CP_TRECHO */}
        <Text style={styles.label}>CP_TRECHO Afetado</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowTrechos(!showTrechos)}
        >
          <Ionicons name="search" size={18} color="#888" />
          <Text style={trecho ? styles.dropdownValor : styles.dropdownPlaceholder}>
            {trecho || "Pesquise ou selecione o CP_TRECHO afetado"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#888" />
        </TouchableOpacity>
        {showTrechos && (
          <View style={styles.dropdownLista}>
            <TextInput
              style={styles.buscaInput}
              placeholder="Buscar..."
              value={buscaTrecho}
              onChangeText={setBuscaTrecho}
            />
            {trechosFiltrados.map((t) => (
              <TouchableOpacity
                key={t}
                style={styles.dropdownItem}
                onPress={() => {
                  setTrecho(t);
                  setShowTrechos(false);
                  setBuscaTrecho("");
                }}
              >
                <Text>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Botão Salvar */}
        <Button title="Salvar Sinistro" onPress={salvarSinistro} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  content: { padding: 16, gap: 8, paddingBottom: 40 },
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e4d1e",
    marginBottom: 12,
    marginTop: 4,
  },
  fotoArea: {
    borderWidth: 2,
    borderColor: "#aaa",
    borderStyle: "dashed",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  fotoTitulo: { color: "#2d6a2d", fontWeight: "bold", fontSize: 16, marginTop: 8 },
  fotoSubtitulo: { color: "#888", fontSize: 13, marginTop: 4 },
  label: { fontWeight: "bold", fontSize: 15, marginTop: 12, marginBottom: 6 },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownPlaceholder: { color: "#aaa", flex: 1, marginHorizontal: 8 },
  dropdownValor: { color: "#333", flex: 1, marginHorizontal: 8 },
  dropdownLista: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 4,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  textarea: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    height: 140,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#333",
  },
  contador: { textAlign: "right", color: "#aaa", fontSize: 12, marginTop: 4 },
  buscaInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});