// src/screens/DashboardScreen.jsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import useTasks from '../hooks/useTasks';
import TaskItem from '../components/tasks/TaskItem';
import TaskFilter from '../components/tasks/TaskFilter';
import Loader from '../components/common/Loader';
import { COLORS, FONT_SIZES, SPACING } from '../constants/colors';

/**
 * Écran Dashboard (liste des tâches)
 */
const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const {
    tasks,
    stats,
    isLoading,
    filter,
    setFilter,
    markAsDone,
    refresh,
  } = useTasks();

  /**
   * Marquer une tâche comme terminée
   */
  const handleToggleDone = async (taskId) => {
    const result = await markAsDone(taskId);
    
    if (!result.success) {
      Alert.alert('Erreur', result.message);
    }
  };

  /**
   * Naviguer vers les détails d'une tâche
   */
  const handleTaskPress = (task) => {
    navigation.navigate('TaskDetail', { taskId: task.id });
  };

  /**
   * Se déconnecter
   */
  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  /**
   * Rendu d'une tâche
   */
  const renderTask = ({ item }) => (
    <TaskItem
      task={item}
      onPress={() => handleTaskPress(item)}
      onToggleDone={handleToggleDone}
    />
  );

  /**
   * Message si aucune tâche
   */
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="checkbox-outline" size={80} color={COLORS.gray} />
      <Text style={styles.emptyTitle}>Aucune tâche</Text>
      <Text style={styles.emptyText}>
        {filter === 'all'
          ? 'Commencez par créer votre première tâche'
          : `Aucune tâche ${filter === 'pending' ? 'en attente' : 'terminée'}`}
      </Text>
    </View>
  );

  // Afficher un loader au premier chargement
  if (isLoading && tasks.length === 0) {
    return <Loader message="Chargement des tâches..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.userName}>{user?.name} 👋</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.danger} />
        </TouchableOpacity>
      </View>

      {/* Statistiques */}
      {stats && (
        <View style={styles.statsContainer}>
          <StatCard
            icon="checkbox"
            value={stats.total}
            label="Total"
            color={COLORS.primary}
          />
          <StatCard
            icon="time"
            value={stats.pending}
            label="En attente"
            color={COLORS.warning}
          />
          <StatCard
            icon="checkmark-circle"
            value={stats.done}
            label="Terminées"
            color={COLORS.success}
          />
        </View>
      )}

      {/* Filtres */}
      <TaskFilter activeFilter={filter} onFilterChange={setFilter} />

      {/* Liste des tâches */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />

      {/* Bouton flottant pour ajouter une tâche */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

/**
 * Composant StatCard pour afficher une statistique
 */
const StatCard = ({ icon, value, label, color }) => (
  <View style={[styles.statCard, { borderLeftColor: color }]}>
    <Ionicons name={icon} size={24} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  greeting: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  logoutButton: {
    padding: SPACING.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: SPACING.lg,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  fab: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default DashboardScreen;