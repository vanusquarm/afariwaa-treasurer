import { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Share2, Eye } from 'lucide-react-native';
import { useAnnouncementStore } from '../store/useAnnouncementStore';
import { COLORS } from '../constants/colors';
import Button from '../components/Button';
import { formatDate, getPriorityColor } from '../utils/formatting';

export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const announcements = useAnnouncementStore((state) => state.announcements);
  const announcement = announcements.find((a) => a.id === id);
  const likeAnnouncement = useAnnouncementStore((state) => state.likeAnnouncement);
  const [liked, setLiked] = useState(false);

  if (!announcement) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Announcement not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const priorityColor = getPriorityColor(announcement.priority);

  const handleLike = () => {
    if (!liked) {
      likeAnnouncement(announcement.id);
      setLiked(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Announcement</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {announcement.image && (
          <Image source={{ uri: announcement.image }} style={styles.mainImage} />
        )}

        <View style={styles.content}>
          <View style={styles.meta}>
            <View
              style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}
            >
              <Text style={[styles.priorityText, { color: priorityColor }]}>
                {announcement.priority.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.category}>{announcement.category}</Text>
            <Text style={styles.date}>{formatDate(announcement.createdAt)}</Text>
          </View>

          <Text style={styles.titleText}>{announcement.title}</Text>

          <View style={styles.authorSection}>
            <Text style={styles.authorLabel}>Posted by</Text>
            <Text style={styles.author}>
              {announcement.author} ({announcement.authorRole})
            </Text>
          </View>

          <Text style={styles.fullContent}>{announcement.content}</Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Eye size={16} color={COLORS.textSecondary} />
              <Text style={styles.statText}>{announcement.views} views</Text>
            </View>
            <View style={styles.stat}>
              <Heart size={16} color={COLORS.textSecondary} />
              <Text style={styles.statText}>{announcement.likes} likes</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            text={liked ? 'Liked' : `Like (${announcement.likes})`}
            onPress={handleLike}
            variant={liked ? 'primary' : 'outline'}
            size="medium"
          />
          <Button
            text="Share"
            onPress={() => alert('Share functionality not yet implemented')}
            variant="outline"
            size="medium"
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
  mainImage: { width: '100%', height: 220, backgroundColor: COLORS.background },
  content: { padding: 16 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  priorityText: { fontSize: 10, fontWeight: '700' },
  category: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '600' },
  date: { fontSize: 11, color: COLORS.textSecondary, marginLeft: 'auto' },
  titleText: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  authorSection: { marginBottom: 16, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: COLORS.background, borderRadius: 8 },
  authorLabel: { fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 },
  author: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  fullContent: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.text,
    marginBottom: 16,
  },
  statsRow: { flexDirection: 'row', gap: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: COLORS.border, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '500' },
  actions: { flexDirection: 'row', gap: 12, padding: 16 },
});
