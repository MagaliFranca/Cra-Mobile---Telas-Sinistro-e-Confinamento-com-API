import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consórcio Recife Ambiental</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/confinamento')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1e4d1e', marginBottom: 40 },
  button: { backgroundColor: '#2d6a2d', paddingVertical: 15, paddingHorizontal: 60, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});