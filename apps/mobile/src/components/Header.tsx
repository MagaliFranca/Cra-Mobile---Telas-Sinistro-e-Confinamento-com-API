import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      
      {/* Botão voltar */}
      <TouchableOpacity>
        <Text style={styles.back}>{'<'}</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Consórcio Recife Ambiental</Text>

      {/* Logo */}
      <Image 
        source={require('../../assets/images/LOGO_CONSORCIO_RECIFE_AMBIENTAL_BRANCO.png')} 
        style={styles.logo} 
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b5d3b',
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    color: '#fff',
    fontSize: 20,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});