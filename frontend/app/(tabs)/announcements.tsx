import { View, FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAnnouncementStore } from '../../store/useAnnouncementStore';
import SearchBar from '../../components/SearchBar';
import AnnouncementCard from '../../components/AnnouncementCard';
import { COLORS } from '../../constants/colors';

const PRIORITY_FILTERS = ['All', 'critical', 'high', 'medium', 'low'];

export default function AnnouncementsScreen() {
  const router = useRouter();
  const announcements = useAnnouncementStore((state) => state.announcements);
  const incrementViews = useAnnouncementStore((state) => state.incrementViews);
  const [search, setSearch] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All');

  const filtered = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = selectedPriority === 'All' || a.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const handleAnnouncementPress = (id: string) => {
    incrementViews(id);
    router.push(`/announcement-detail?id=${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search announcements..."
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
        />

        <FlatList
          data={PRIORITY_FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterPill,
                selectedPriority === item && styles.filterPillActive,
              ]}
              onPress={() => setSelectedPriority(item)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  selectedPriority === item && styles.filterPillTextActive,
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
              <AnnouncementCard
                announcement={item}
                onPress={() => handleAnnouncementPress(item.id)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No announcements found</Text>
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
