import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Announcement } from '../types';
import { Heart, Eye } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { formatDate, getPriorityColor } from '../utils/formatting';

interface AnnouncementCardProps {
  announcement: Announcement;
  onPress?: () => void;
}

export default function AnnouncementCard({ announcement, onPress }: AnnouncementCardProps) {
  const priorityColor = getPriorityColor(announcement.priority);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {announcement.image && (
        <Image source={{ uri: announcement.image }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}>
              <Text style={[styles.priorityText, { color: priorityColor }]}>
                {announcement.priority.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.category}>{announcement.category}</Text>
          </View>
          <Text style={styles.date}>{formatDate(announcement.createdAt)}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {announcement.title}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {announcement.content}
        </Text>

        <View style={styles.footer}>
          <View style={styles.meta}>
            <Eye size={14} color={COLORS.textSecondary} />
            <Text style={styles.metaText}>{announcement.views}</Text>
          </View>
          <View style={styles.meta}>
            <Heart size={14} color={COLORS.textSecondary} />
            <Text style={styles.metaText}>{announcement.likes}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.author}>{announcement.authorRole}</Text>
          </View>
        </View>
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
    height: 160,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  priorityBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  category: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  date: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  preview: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  author: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
