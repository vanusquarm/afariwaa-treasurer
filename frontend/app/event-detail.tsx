import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { useEventStore } from '../store/useEventStore';
import { COLORS } from '../constants/colors';
import Button from '../components/Button';
import { formatDate, formatCurrency } from '../utils/formatting';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const events = useEventStore((state) => state.events);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Event not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Event Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {event.image && (
          <Image source={{ uri: event.image }} style={styles.mainImage} />
        )}

        <View style={styles.content}>
          <View style={styles.header2}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#D1FAE5' }]}>
              <Text style={[styles.statusText, { color: '#059669' }]}>
                {event.status}
              </Text>
            </View>
          </View>

          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Calendar size={18} color={COLORS.primary} />
              <View>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{formatDate(event.startDate)}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MapPin size={18} color={COLORS.primary} />
              <View>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{event.location}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Users size={18} color={COLORS.primary} />
              <View>
                <Text style={styles.detailLabel}>Attendees</Text>
                <Text style={styles.detailValue}>{event.attendees} people</Text>
              </View>
            </View>

            {event.estimatedBudget && (
              <View style={styles.detailItem}>
                <DollarSign size={18} color={COLORS.primary} />
                <View>
                  <Text style={styles.detailLabel}>Budget</Text>
                  <Text style={styles.detailValue}>
                    {formatCurrency(event.estimatedBudget)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            text="Register Interest"
            onPress={() => alert('Registration not yet implemented')}
            variant="primary"
          />
          <Button
            text="Share Event"
            onPress={() => alert('Share functionality not yet implemented')}
            variant="outline"
            style={{ marginTop: 8 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: COLORS.textSecondary },
  scroll: { paddingBottom: 32 },
  mainImage: { width: '100%', height: 240, backgroundColor: COLORS.background },
  content: { padding: 16 },
  header2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, flex: 1, marginRight: 8 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  description: { fontSize: 14, lineHeight: 20, color: COLORS.textSecondary, marginBottom: 16 },
  detailsGrid: { gap: 12, marginBottom: 16 },
  detailItem: { flexDirection: 'row', gap: 12, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: COLORS.background, borderRadius: 10 },
  detailLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 2 },
  detailValue: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  actions: { paddingHorizontal: 16, paddingBottom: 16 },
});
