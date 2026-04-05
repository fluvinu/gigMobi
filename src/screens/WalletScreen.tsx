import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';
import { Gig } from '../types';

type WalletScreenProps = {
  gigs: Gig[];
};

export function WalletScreen({ gigs }: WalletScreenProps) {
  const completed = gigs.filter((gig) => gig.status === 'Completed').length;
  const inProgress = gigs.filter((gig) => gig.status === 'In Progress').length;

  const totalBudget = gigs.reduce((sum, gig) => sum + gig.budget, 0);
  const estimatedMargin = totalBudget * 0.15;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wallet & Stats</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Total Gig Value</Text>
        <Text style={styles.value}>${totalBudget.toFixed(2)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Estimated Platform Margin (15%)</Text>
        <Text style={styles.value}>${estimatedMargin.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.smallCard}>
          <Text style={styles.label}>In Progress</Text>
          <Text style={styles.value}>{inProgress}</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.label}>Completed</Text>
          <Text style={styles.value}>{completed}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    gap: 12
  },
  smallCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14
  },
  label: {
    color: colors.muted,
    marginBottom: 8
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text
  }
});
