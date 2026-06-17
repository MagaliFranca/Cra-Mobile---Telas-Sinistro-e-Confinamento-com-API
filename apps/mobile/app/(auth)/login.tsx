import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../src/services/api';

export default function Login() {
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);

  const entrar = async () => {
    if (!matricula) {
      alert('Preencha a matrícula.');
      return;
    }
    setLoading(true);
    try {
      await api.auth.login(matricula);
      router.replace('/dashboard');
    } catch {
      alert('Matrícula incorreta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/images/logo_verde.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>Bem-vindo(a)!</Text>
        <Text style={styles.subtitulo}>
          Acesse sua conta para continuar acompanhando nossas soluções ambientais.
        </Text>

        {/* Matrícula */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Matrícula"
            placeholderTextColor="#aaa"
            value={matricula}
            onChangeText={setMatricula}
            keyboardType="numeric"
            maxLength={4}
          />
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.botao} onPress={entrar} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.ou}>ou</Text>

        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
          <Text style={styles.esqueceu}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
  },
  logo: {
    width: 160,
    height: 80,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e4d1e',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
    width: '100%',
    height: 50,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  botao: {
    backgroundColor: '#2d6a2d',
    borderRadius: 10,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ou: {
    color: '#aaa',
    marginVertical: 12,
  },
  esqueceu: {
    color: '#2d6a2d',
    fontSize: 14,
  },
});