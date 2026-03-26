import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Event } from '../types';
import { Calendar, MapPin, Users } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { formatDate, getDaysUntil, getStatusBadgeColor } from '../utils/formatting';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  const daysUntil = getDaysUntil(event.startDate);
  const statusColor = getStatusBadgeColor(event.status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {event.image && (
        <Image source={{ uri: event.image }} style={styles.image} />
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
            <Text style={[styles.statusText, { color: statusColor.text }]}>
              {event.status}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Calendar size={14} color={COLORS.primary} />
            <Text style={styles.detailText}>{formatDate(event.startDate)}</Text>
          </View>
          <View style={styles.detailRow}>
            <MapPin size={14} color={COLORS.primary} />
            <Text style={styles.detailText} numberOfLines={1}>
              {event.location}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Users size={14} color={COLORS.primary} />
            <Text style={styles.detailText}>{event.attendees} attendees</Text>
          </View>
        </View>

        {event.estimatedBudget && (
          <View style={styles.budget}>
            <Text style={styles.budgetLabel}>Budget:</Text>
            <Text style={styles.budgetValue}>GH₵{event.estimatedBudget}</Text>
          </View>
        )}

        {event.status === 'upcoming' && daysUntil >= 0 && (
          <View style={styles.countdown}>
            <Text style={styles.countdownText}>
              {daysUntil === 0 ? 'Today' : `${daysUntil} days away`}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  details: {
    gap: 6,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  budget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  budgetLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  budgetValue: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
  },
  countdown: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 6,
  },
  countdownText: {
    fontSize: 11,
    color: COLORS.primaryDark,
    fontWeight: '600',
    textAlign: 'center',
  },
});
