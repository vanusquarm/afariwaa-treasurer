import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFinanceStore } from '../../store/useFinanceStore';
import { useResidentStore } from '../../store/useResidentStore';
import { useEventStore } from '../../store/useEventStore';
import StatCard from '../../components/StatCard';
import {
  Wallet,
  Users,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Calendar,
} from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { formatCurrency, formatDate } from '../../utils/formatting';

export default function DashboardScreen() {
  const router = useRouter();
  const { getFinancialSummary, transactions } = useFinanceStore();
  const { residents } = useResidentStore();
  const { getUpcomingEvents } = useEventStore();
  
  const summary = getFinancialSummary();
  const upcomingEvents = getUpcomingEvents();
  const recentTransactions = transactions.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Overview</Text>
          <StatCard
            label="Total Collected"
            value={formatCurrency(summary.totalCollected)}
            icon={Wallet}
            color={COLORS.primary}
            onPress={() => router.push('/(tabs)/announcements')}
          />
          <StatCard
            label={`Residents (Paid)`}
            value={`${summary.residents.paid}/${residents.length}`}
            icon={Users}
            color={COLORS.secondary}
          />
          <StatCard
            label="Outstanding Dues"
            value={formatCurrency(
              residents.reduce((acc, r) => acc + r.totalDuesOwed, 0)
            )}
            icon={AlertCircle}
            color={COLORS.danger}
          />
          <StatCard
            label="Balance"
            value={formatCurrency(summary.balance)}
            subtitle="Total collected - expenses"
            icon={TrendingUp}
            color={COLORS.primary}
          />
        </View>

        {upcomingEvents.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/events')}>
                <ArrowRight size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            {upcomingEvents.slice(0, 2).map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventItem}
                onPress={() => router.push(`/event-detail?id=${event.id}`)}
              >
                <Calendar size={18} color={COLORS.primary} />
                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle} numberOfLines={1}>
                    {event.title}
                  </Text>
                  <Text style={styles.eventDate}>{formatDate(event.startDate)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/announcements')}>
              <ArrowRight size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.txLeft}>
                <Text style={styles.txTitle} numberOfLines={1}>
                  {transaction.title}
                </Text>
                <Text style={styles.txCategory}>{transaction.category}</Text>
              </View>
              <Text
                style={[
                  styles.txAmount,
                  {
                    color: transaction.type === 'credit' ? COLORS.primary : COLORS.text,
                  },
                ]}
              >
                {transaction.type === 'credit' ? '+' : '-'} {formatCurrency(transaction.amount)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Status</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statBox, { backgroundColor: '#D1FAE5' }]}>
              <Text style={[styles.statNumber, { color: '#059669' }]}>
                {summary.residents.paid}
              </Text>
              <Text style={[styles.statLabel, { color: '#059669' }]}>Paid</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#FEF3C7' }]}>
              <Text style={[styles.statNumber, { color: '#D97706' }]}>
                {summary.residents.partial}
              </Text>
              <Text style={[styles.statLabel, { color: '#D97706' }]}>Partial</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#FEE2E2' }]}>
              <Text style={[styles.statNumber, { color: '#DC2626' }]}>
                {summary.residents.unpaid}
              </Text>
              <Text style={[styles.statLabel, { color: '#DC2626' }]}>Unpaid</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16, paddingBottom: 32 },
  section: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    marginBottom: 8,
  },
  eventContent: { flex: 1, marginLeft: 12 },
  eventTitle: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  eventDate: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    marginBottom: 8,
  },
  txLeft: { flex: 1 },
  txTitle: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  txCategory: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  txAmount: { fontSize: 13, fontWeight: '700' },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  statNumber: { fontSize: 20, fontWeight: '700', marginBottom: 4 },
  statLabel: { fontSize: 11, fontWeight: '600' },
});
