import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Home, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import Button from '../../components/Button';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 0 && password.length > 0, [email, password]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Home size={20} color={COLORS.surface} />
            </View>
            <Text style={styles.headerTitle}>Afariwaa Royal Homes</Text>
            <Text style={styles.headerSubtitle}>Resident Portal</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.segmented}>
              <View style={[styles.segment, styles.segmentActive]}>
                <Text style={[styles.segmentText, styles.segmentTextActive]}>Login</Text>
              </View>
              <TouchableOpacity
                style={styles.segment}
                activeOpacity={0.8}
                onPress={() => router.push('/(auth)/register')}
              >
                <Text style={styles.segmentText}>Register</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputRow}>
                <Mail size={18} color={COLORS.textSecondary} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.gray[400]}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  style={styles.input}
                  returnKeyType="next"
                />
              </View>

              <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
              <View style={styles.inputRow}>
                <Lock size={18} color={COLORS.textSecondary} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.gray[400]}
                  secureTextEntry={!showPassword}
                  textContentType="password"
                  style={styles.input}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((s) => !s)}
                  activeOpacity={0.8}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {showPassword ? (
                    <EyeOff size={18} color={COLORS.textSecondary} />
                  ) : (
                    <Eye size={18} color={COLORS.textSecondary} />
                  )}
                </TouchableOpacity>
              </View>

              <Button
                text="Login"
                onPress={() => router.replace('/(tabs)')}
                disabled={!canSubmit}
                style={styles.loginButton}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => alert('Forgot password not yet implemented')}
                style={styles.forgot}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.terms}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingBottom: 28 },
  header: {
    backgroundColor: '#1F6F5B',
    paddingTop: 18,
    paddingBottom: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerTitle: { color: COLORS.surface, fontSize: 18, fontWeight: '800' },
  headerSubtitle: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 },

  card: {
    marginTop: -14,
    marginHorizontal: 14,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray[100],
    borderRadius: 12,
    padding: 3,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: { backgroundColor: COLORS.surface },
  segmentText: { fontSize: 13, fontWeight: '700', color: COLORS.textSecondary },
  segmentTextActive: { color: COLORS.text },

  form: { marginTop: 14 },
  label: { fontSize: 12, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.gray[50],
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
  },
  input: { flex: 1, fontSize: 14, color: COLORS.text, paddingVertical: 0 },
  loginButton: { marginTop: 16, borderRadius: 12, paddingVertical: 14 },
  forgot: { paddingVertical: 10, alignItems: 'center' },
  forgotText: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '600' },

  terms: {
    marginTop: 14,
    paddingHorizontal: 18,
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  termsLink: { color: COLORS.primaryDark, fontWeight: '700' },
});

