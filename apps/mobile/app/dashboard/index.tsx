import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

function CirculoProgresso({ percentual }: { percentual: number }) {
  const tamanho = 80;
  const strokeWidth = 7;
  const raio = (tamanho - strokeWidth) / 2;
  const circunferencia = 2 * Math.PI * raio;
  const progresso = circunferencia - (circunferencia * Math.min(percentual, 100)) / 100;

  return (
    <View style={{ width: tamanho, height: tamanho, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={tamanho} height={tamanho}>
        <Circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          stroke="#dceede"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          stroke="#2d6a2d"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circunferencia}
          strokeDashoffset={progresso}
          strokeLinecap="round"
          rotation="-90"
          origin={`${tamanho / 2}, ${tamanho / 2}`}
        />
      </Svg>
      <View style={styles.metaCircleTextWrap}>
        <Ionicons name="flag-outline" size={14} color="#2d6a2d" />
        <Text style={styles.metaCircleText}>{percentual}%</Text>
        <Text style={styles.metaCircleLabel}>da Meta</Text>
      </View>
    </View>
  );
}

export default function Dashboard() {
  const [data] = useState({
    nome: 'João Oliveira',
    cargo: 'Líder de Campo',
    regiao: 'Região Norte',
    kmExecutado: 24.7,
    kmRefeito: 3.2,
    kmCortado: 1.8,
    metaDiaria: 30.0,
  });

  const percentualMeta = Math.round((data.kmExecutado / data.metaDiaria) * 100);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <Text style={styles.headerSubtitle}>Visão geral de produtividade</Text>
            </View>
            <TouchableOpacity style={styles.syncButton}>
              <Ionicons name="sync-outline" size={18} color="#fff" />
              <Text style={styles.syncText}>Sincronizar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.userRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JO</Text>
            </View>
            <View>
              <Text style={styles.userName}>{data.nome}</Text>
              <Text style={styles.userCargo}>{data.cargo}</Text>
              <View style={styles.regiaoRow}>
                <Ionicons name="location-outline" size={12} color="#cde6cd" />
                <Text style={styles.userRegiao}>{data.regiao}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Produtividade */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produtividade</Text>

          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <Ionicons name="walk-outline" size={20} color="#fff" />
              </View>
              <Text style={styles.metricLabel}>KM Executado</Text>
              <Text style={styles.metricValue}>{data.kmExecutado.toFixed(1)} <Text style={styles.metricUnit}>km</Text></Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <Ionicons name="refresh-outline" size={20} color="#fff" />
              </View>
              <Text style={styles.metricLabel}>KM Refeito</Text>
              <Text style={styles.metricValue}>{data.kmRefeito.toFixed(1)} <Text style={styles.metricUnit}>km</Text></Text>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <Ionicons name="cut-outline" size={20} color="#fff" />
              </View>
              <Text style={styles.metricLabel}>KM Cortado</Text>
              <Text style={styles.metricValue}>{data.kmCortado.toFixed(1)} <Text style={styles.metricUnit}>km</Text></Text>
            </View>
          </View>

          {/* % da Meta */}
          <View style={styles.metaCard}>
            <View>
              <Text style={styles.metaTitle}>% da Meta</Text>
              <Text style={styles.metaSubtitle}>Meta diária: {data.metaDiaria.toFixed(1)} KM</Text>
              <Text style={styles.metaPercentBig}>{percentualMeta}%</Text>
              <Text style={styles.metaFracao}>{data.kmExecutado.toFixed(1)} / {data.metaDiaria.toFixed(1)} KM</Text>
            </View>
            <CirculoProgresso percentual={percentualMeta} />
          </View>
        </View>

        {/* Ações principais */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/confinamento')}
          >
            <Ionicons name="location-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Registrar Ponto de Confinamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => router.push('/sinistro')}
          >
            <Ionicons name="warning-outline" size={18} color="#fff" />
            <Text style={styles.actionButtonText}>Registrar Sinistro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  content: { paddingBottom: 40 },
  header: {
    backgroundColor: '#0b5d3b',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#cde6cd', fontSize: 13, marginTop: 2 },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  syncText: { color: '#fff', fontSize: 12 },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2d6a2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: 'bold' },
  userName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  userCargo: { color: '#cde6cd', fontSize: 13 },
  regiaoRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  userRegiao: { color: '#cde6cd', fontSize: 12 },
  section: { paddingHorizontal: 16, marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2d6a2d',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  metricValue: { fontSize: 18, fontWeight: 'bold', color: '#1e4d1e' },
  metricUnit: { fontSize: 12, fontWeight: 'normal', color: '#888' },
  metaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaTitle: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  metaSubtitle: { fontSize: 12, color: '#888', marginTop: 2, marginBottom: 8 },
  metaPercentBig: { fontSize: 28, fontWeight: 'bold', color: '#1e4d1e' },
  metaFracao: { fontSize: 12, color: '#888', marginTop: 2 },
  metaCircleTextWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  metaCircleText: { fontWeight: 'bold', color: '#1e4d1e', fontSize: 13 },
  metaCircleLabel: { fontSize: 9, color: '#888' },
  actionButton: {
    backgroundColor: '#2d6a2d',
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  actionButtonSecondary: {
    backgroundColor: '#5b7f4f',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});