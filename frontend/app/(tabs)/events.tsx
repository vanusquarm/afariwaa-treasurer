import { View, FlatList, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useEventStore } from '../../store/useEventStore';
import EventCard from '../../components/EventCard';
import { COLORS } from '../../constants/colors';

const STATUS_FILTERS = ['All', 'upcoming', 'ongoing', 'completed'];

export default function EventsScreen() {
  const router = useRouter();
  const { getEventsByStatus } = useEventStore();
  const events = useEventStore((state) => state.events);
  const [selectedStatus, setSelectedStatus] = useState('upcoming');

  const filtered =
    selectedStatus === 'All'
      ? events.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        )
      : getEventsByStatus(selectedStatus).sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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
              <EventCard
                event={item}
                onPress={() => router.push(`/event-detail?id=${item.id}`)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No events found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 16 },
  filtersContainer: { gap: 8 },
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
