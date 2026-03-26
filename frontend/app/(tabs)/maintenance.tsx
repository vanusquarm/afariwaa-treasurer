import { View, FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useMaintenanceStore } from '../../store/useMaintenanceStore';
import SearchBar from '../../components/SearchBar';
import MaintenanceCard from '../../components/MaintenanceCard';
import { COLORS } from '../../constants/colors';

const STATUS_FILTERS = ['All', 'open', 'assigned', 'in-progress', 'completed'];

export default function MaintenanceScreen() {
  const router = useRouter();
  const { getRequestsByStatus } = useMaintenanceStore();
  const requests = useMaintenanceStore((state) => state.requests);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || r.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search maintenance requests..."
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
        />

        <FlatList
          data={STATUS_FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterPill,
                selectedStatus === item && styles.filterPillActive,
              ]}
              onPress={() => setSelectedStatus(item)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  selectedStatus === item && styles.filterPillTextActive,
                ]}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {filtered.length > 0 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <MaintenanceCard
                request={item}
                onPress={() => router.push(`/maintenance-detail?id=${item.id}`)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No maintenance requests found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16 },
  filtersContainer: { gap: 8, paddingBottom: 8 },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterPillText: { fontSize: 12, fontWeight: '600', color: COLORS.text },
  filterPillTextActive: { color: COLORS.surface },
  cardContainer: { paddingHorizontal: 16 },
  listContent: { paddingTop: 8, paddingBottom: 32 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: COLORS.textSecondary, fontWeight: '500' },
});
