import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Resident } from '../types';
import { ChevronRight } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

interface ResidentCardProps {
  resident: Resident;
  onPress?: () => void;
}

export default function ResidentCard({ resident, onPress }: ResidentCardProps) {
  const getStatusColor = () => {
    switch (resident.paymentStatus) {
      case 'paid':
        return { bg: '#D1FAE5', text: '#059669' };
      case 'partial':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'unpaid':
      case 'overdue':
        return { bg: '#FEE2E2', text: '#DC2626' };
      default:
        return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  const statusColor = getStatusColor();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.avatar, { backgroundColor: resident.initialsColor }]}>
        {resident.profileImage ? (
          <Image source={{ uri: resident.profileImage }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarText}>{resident.name.slice(0, 2).toUpperCase()}</Text>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {resident.name}
        </Text>
        <Text style={styles.address} numberOfLines={1}>
          House {resident.houseNumber} • {resident.street}
        </Text>
        {resident.occupants > 0 && (
          <Text style={styles.occupants}>{resident.occupants} occupant{resident.occupants > 1 ? 's' : ''}</Text>
        )}
      </View>

      <View style={styles.right}>
        <View style={[styles.badge, { backgroundColor: statusColor.bg }]}>
          <Text style={[styles.badgeText, { color: statusColor.text }]}>
            {resident.paymentStatus.charAt(0).toUpperCase() + resident.paymentStatus.slice(1)}
          </Text>
        </View>
        {resident.totalDuesOwed > 0 && (
          <Text style={styles.dues}>GH₵{resident.totalDuesOwed}</Text>
        )}
        <ChevronRight size={18} color={COLORS.textSecondary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  avatarText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  occupants: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  right: {
    alignItems: 'flex-end',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  dues: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.danger,
  },
});
