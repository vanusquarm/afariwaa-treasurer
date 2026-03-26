import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Mail, Phone, Home } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { useResidentStore } from '../store/useResidentStore';
import { useFinanceStore } from '../store/useFinanceStore';
import { COLORS, ROLE_COLORS } from '../constants/colors';
import Button from '../components/Button';
import { formatCurrency, formatDate } from '../utils/formatting';

export default function ResidentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const resident = useResidentStore((state) => state.getResidentById(id || ''));
  const { getTransactionsByResident } = useFinanceStore();
  const updatePaymentStatus = useResidentStore(
    (state) => state.updatePaymentStatus
  );

  if (!resident) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Resident not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const transactions = getTransactionsByResident(resident.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Resident Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={[styles.largeAvatar, { backgroundColor: resident.initialsColor }]}>
            {resident.profileImage ? (
              <Image source={{ uri: resident.profileImage }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.largeAvatarText}>{resident.name.slice(0, 2)}</Text>
            )}
          </View>
          <Text style={styles.name}>{resident.name}</Text>
          <View style={[styles.roleBadge, { backgroundColor: ROLE_COLORS[resident.role] + '20' }]}>
            <Text style={[styles.roleText, { color: ROLE_COLORS[resident.role] }]}>
              {resident.role.charAt(0).toUpperCase() + resident.role.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Mail size={18} color={COLORS.primary} />
            <Text style={styles.infoText}>{resident.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Phone size={18} color={COLORS.primary} />
            <Text style={styles.infoText}>{resident.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Home size={18} color={COLORS.primary} />
            <Text style={styles.infoText}>
              House {resident.houseNumber}, {resident.street}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Status</Text>
          <View style={styles.statusCard}>
            <View>
              <Text style={styles.statusLabel}>Current Status</Text>
              <Text style={styles.statusValue}>{resident.paymentStatus.toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.statusLabel}>Outstanding Dues</Text>
              <Text style={[styles.statusValue, { color: COLORS.danger }]}>
                {formatCurrency(resident.totalDuesOwed)}
              </Text>
            </View>
          </View>
          {resident.lastPaymentDate && (
            <Text style={styles.lastPayment}>
              Last payment: {formatDate(resident.lastPaymentDate)}
            </Text>
          )}
        </View>

        {resident.occupants > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Occupants ({resident.occupants})</Text>
            {resident.occupantNames && resident.occupantNames.length > 0 ? (
              resident.occupantNames.map((name, idx) => (
                <View key={idx} style={styles.occupantItem}>
                  <View style={styles.occupantDot} />
                  <Text style={styles.occupantName}>{name}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noData}>No occupant details available</Text>
            )}
          </View>
        )}

        {transactions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transaction History</Text>
            {transactions.slice(0, 5).map((tx) => (
              <View key={tx.id} style={styles.transactionRow}>
                <View>
                  <Text style={styles.txTitle}>{tx.title}</Text>
                  <Text style={styles.txDate}>{formatDate(tx.date)}</Text>
                </View>
                <Text style={styles.txAmount}>
                  {tx.type === 'credit' ? '+' : '-'} {formatCurrency(tx.amount)}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.actionsSection}>
          <Button
            text="Mark as Paid"
            onPress={() => {
              updatePaymentStatus(resident.id, 'paid');
              router.back();
            }}
            variant="primary"
          />
          <Button
            text="Record Payment"
            onPress={() => alert('Payment recording not yet implemented')}
            variant="secondary"
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
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  largeAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarImage: { width: '100%', height: '100%', borderRadius: 40 },
  largeAvatarText: { color: COLORS.surface, fontWeight: '700', fontSize: 28 },
  name: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  roleBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  roleText: { fontSize: 12, fontWeight: '700', textTransform: 'capitalize' },
  section: { padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  infoText: { fontSize: 13, color: COLORS.textSecondary, flex: 1 },
  statusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    marginBottom: 8,
  },
  statusLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 },
  statusValue: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  lastPayment: { fontSize: 11, color: COLORS.textSecondary, marginTop: 8 },
  occupantItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  occupantDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginRight: 8 },
  occupantName: { fontSize: 13, color: COLORS.text },
  noData: { fontSize: 13, color: COLORS.textSecondary, fontStyle: 'italic' },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  txTitle: { fontSize: 12, fontWeight: '600', color: COLORS.text },
  txDate: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  txAmount: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  actionsSection: { padding: 16 },
});
