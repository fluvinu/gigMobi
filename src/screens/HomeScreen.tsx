import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { GigCard } from '../components/GigCard';
import { colors } from '../theme';
import { Gig } from '../types';

type HomeScreenProps = {
  gigs: Gig[];
  onTakeGig: (id: string) => Promise<boolean>;
};

export function HomeScreen({ gigs, onTakeGig }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Gigs</Text>
      <Text style={styles.subheading}>Take a gig and start earning instantly.</Text>

      <FlatList
        data={gigs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GigCard
            gig={item}
            onTakeGig={async (id) => {
              const success = await onTakeGig(id);
              if (success) {
                Alert.alert('Gig accepted', 'This gig has moved to In Progress.');
              }
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 18
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text
  },
  subheading: {
    marginTop: 6,
    marginBottom: 14,
    color: colors.muted
  },
  listContent: {
    paddingBottom: 20
  }
});
