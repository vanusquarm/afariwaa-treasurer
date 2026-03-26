import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaintenanceRequest } from '../types';
import { MapPin, User } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { formatDate, getPriorityColor, getStatusBadgeColor } from '../utils/formatting';

interface MaintenanceCardProps {
  request: MaintenanceRequest;
  onPress?: () => void;
}

export default function MaintenanceCard({ request, onPress }: MaintenanceCardProps) {
  const priorityColor = getPriorityColor(request.priority);
  const statusColor = getStatusBadgeColor(request.status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={[styles.priorityDot, { backgroundColor: priorityColor }]} />
          <Text style={styles.title} numberOfLines={1}>
            {request.title}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
          <Text style={[styles.statusText, { color: statusColor.text }]}>
            {request.status.replace('-', ' ')}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MapPin size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{request.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <User size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{request.requesterName}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.category}>{request.category}</Text>
        <Text style={styles.date}>{formatDate(request.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  category: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  date: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
