import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';
import { Gig } from '../types';

type GigCardProps = {
  gig: Gig;
  onTakeGig?: (id: string) => void;
};

export function GigCard({ gig, onTakeGig }: GigCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{gig.title}</Text>
        <Text style={styles.price}>${gig.budget}</Text>
      </View>

      <Text style={styles.meta}>{gig.city} • {gig.category} • {gig.status}</Text>
      <Text style={styles.description}>{gig.description}</Text>

      {gig.status === 'Open' && (
        <Pressable style={styles.button} onPress={() => onTakeGig?.(gig.id)}>
          <Text style={styles.buttonLabel}>Take Gig</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
    flex: 1,
    paddingRight: 8
  },
  price: {
    color: colors.primary,
    fontWeight: '700'
  },
  meta: {
    color: colors.muted,
    marginTop: 6,
    marginBottom: 8
  },
  description: {
    color: colors.text,
    marginBottom: 12
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '700'
  }
});
