import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, User, Wrench, DollarSign, Calendar } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { useMaintenanceStore } from '../store/useMaintenanceStore';
import { COLORS } from '../constants/colors';
import Button from '../components/Button';
import { formatDate, formatCurrency, getPriorityColor } from '../utils/formatting';

export default function MaintenanceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const requests = useMaintenanceStore((state) => state.requests);
  const request = requests.find((r) => r.id === id);
  const updateRequestStatus = useMaintenanceStore((state) => state.updateRequestStatus);

  if (!request) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Request not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const priorityColor = getPriorityColor(request.priority);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Request Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.requestTitle}>{request.title}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}>
              <Text style={[styles.priorityText, { color: priorityColor }]}>
                {request.priority.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={[styles.statusBar, { borderLeftColor: priorityColor }]}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusValue}>{request.status.replace('-', ' ')}</Text>
          </View>

          <Text style={styles.description}>{request.description}</Text>

          {request.images && request.images.length > 0 && (
            <View style={styles.imagesSection}>
              <Text style={styles.sectionTitle}>Images</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesScroll}>
                {request.images.map((img, idx) => (
                  <Image key={idx} source={{ uri: img }} style={styles.thumbnail} />
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <MapPin size={18} color={COLORS.primary} />
              <View>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{request.location}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <User size={18} color={COLORS.primary} />
              <View>
                <Text style={styles.detailLabel}>Requested by</Text>
                <Text style={styles.detailValue}>{request.requesterName}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Wrench size={18} color={COLORS.primary} />
              <View>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{request.category}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Calendar size={18} color={COLORS.primary} />
              <View>
                <Text style={styles.detailLabel}>Created</Text>
                <Text style={styles.detailValue}>{formatDate(request.createdAt)}</Text>
              </View>
            </View>

            {request.estimatedCost && (
              <View style={styles.detailItem}>
                <DollarSign size={18} color={COLORS.primary} />
                <View>
                  <Text style={styles.detailLabel}>Estimated Cost</Text>
                  <Text style={styles.detailValue}>{formatCurrency(request.estimatedCost)}</Text>
                </View>
              </View>
            )}

            {request.actualCost && (
              <View style={styles.detailItem}>
                <DollarSign size={18} color={COLORS.success} />
                <View>
                  <Text style={styles.detailLabel}>Actual Cost</Text>
                  <Text style={styles.detailValue}>{formatCurrency(request.actualCost)}</Text>
                </View>
              </View>
            )}
          </View>

          {request.status !== 'completed' && (
            <View style={styles.actions}>
              {request.status === 'open' && (
                <Button
                  text="Assign Request"
                  onPress={() => {
                    updateRequestStatus(request.id, 'assigned');
                    router.back();
                  }}
                  variant="primary"
                />
              )}
              {request.status === 'assigned' && (
                <Button
                  text="Start Work"
                  onPress={() => {
                    updateRequestStatus(request.id, 'in-progress');
                    router.back();
                  }}
                  variant="primary"
                />
              )}
              {request.status === 'in-progress' && (
                <Button
                  text="Mark Complete"
                  onPress={() => {
                    updateRequestStatus(request.id, 'completed');
                    router.back();
                  }}
                  variant="primary"
                />
              )}
              <Button
                text="Cancel"
                onPress={() => {
                  updateRequestStatus(request.id, 'cancelled');
                  router.back();
                }}
                variant="danger"
                style={{ marginTop: 8 }}
              />
            </View>
          )}
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
  content: { padding: 16 },
  titleSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  requestTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, flex: 1, marginRight: 8 },
  priorityBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  priorityText: { fontSize: 11, fontWeight: '700' },
  statusBar: { borderLeftWidth: 4, paddingLeft: 12, paddingVertical: 10, marginBottom: 12, backgroundColor: COLORS.background, borderRadius: 8 },
  statusLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 2 },
  statusValue: { fontSize: 14, fontWeight: '700', color: COLORS.text, textTransform: 'capitalize' },
  description: { fontSize: 14, lineHeight: 20, color: COLORS.textSecondary, marginBottom: 16 },
  imagesSection: { marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  imagesScroll: { marginHorizontal: -16, paddingHorizontal: 16 },
  thumbnail: { width: 100, height: 100, borderRadius: 8, marginRight: 8 },
  detailsGrid: { gap: 12, marginBottom: 16 },
  detailItem: { flexDirection: 'row', gap: 12, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: COLORS.background, borderRadius: 10 },
  detailLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 2 },
  detailValue: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  actions: { gap: 8 },
});
