import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useResidentStore } from '../../store/useResidentStore';
import SearchBar from '../../components/SearchBar';
import ResidentCard from '../../components/ResidentCard';
import { COLORS } from '../../constants/colors';
import { STREETS } from '../../constants/mockData';

export default function ResidentsScreen() {
  const router = useRouter();
  const residents = useResidentStore((state) => state.residents);
  const [search, setSearch] = useState('');
  const [selectedStreet, setSelectedStreet] = useState('All Streets');

  const filtered = residents.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.houseNumber.includes(search);
    const matchesStreet = selectedStreet === 'All Streets' || r.street === selectedStreet;
    return matchesSearch && matchesStreet;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search by name or house #"
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
        />

        <FlatList
          data={STREETS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.streetsContainer}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.streetPill,
                selectedStreet === item && styles.streetPillActive,
              ]}
              onPress={() => setSelectedStreet(item)}
            >
              <Text
                style={[
                  styles.streetPillText,
                  selectedStreet === item && styles.streetPillTextActive,
                ]}
              >
                {item}
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
            <ResidentCard
              resident={item}
              onPress={() => router.push(`/resident-detail?id=${item.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No residents found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16 },
  streetsContainer: { gap: 8, paddingBottom: 8 },
  streetPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  streetPillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  streetPillText: { fontSize: 12, fontWeight: '600', color: COLORS.text },
  streetPillTextActive: { color: COLORS.surface },
  listContent: { paddingHorizontal: 0 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: COLORS.textSecondary, fontWeight: '500' },
});
