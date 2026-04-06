import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { createGig as createGigRequest, fetchGigs, takeGig as takeGigRequest } from './src/api';
import { mockGigs } from './src/data/mockGigs';
import { CreateGigScreen } from './src/screens/CreateGigScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { WalletScreen } from './src/screens/WalletScreen';
import { colors } from './src/theme';
import { Gig, GigCategory } from './src/types';

type Tab = 'home' | 'create' | 'wallet';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const openCount = useMemo(() => gigs.filter((gig) => gig.status === 'Open').length, [gigs]);

  const loadGigs = useCallback(async () => {
    try {
      const data = await fetchGigs();
      setGigs(data);
    } catch {
      setGigs(mockGigs);
      Alert.alert('Using offline data', 'Could not reach backend. Started with local sample gigs.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGigs();
  }, [loadGigs]);

  const takeGig = async (id: string) => {
    try {
      const updated = await takeGigRequest(id);
      setGigs((prev) => prev.map((gig) => (gig.id === id ? updated : gig)));
      return true;
    } catch {
      Alert.alert('Action failed', 'Could not update gig status on backend.');
      return false;
    }
  };

  const createGig = async (payload: {
    title: string;
    description: string;
    budget: number;
    city: string;
    category: GigCategory;
  }) => {
    try {
      const created = await createGigRequest(payload);
      setGigs((prev) => [created, ...prev]);
      setActiveTab('home');
    } catch {
      Alert.alert('Action failed', 'Could not create gig on backend.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.appTitle}>gigMobi</Text>
        <Text style={styles.headerMeta}>{openCount} open gigs</Text>
      </View>

      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading gigs...</Text>
          </View>
        ) : null}
        {!isLoading && activeTab === 'home' && <HomeScreen gigs={gigs} onTakeGig={takeGig} />}
        {!isLoading && activeTab === 'create' && <CreateGigScreen onCreateGig={createGig} />}
        {!isLoading && activeTab === 'wallet' && <WalletScreen gigs={gigs} />}
      </View>

      <View style={styles.tabBar}>
        <TabButton label="Home" active={activeTab === 'home'} onPress={() => setActiveTab('home')} />
        <TabButton label="Post Gig" active={activeTab === 'create'} onPress={() => setActiveTab('create')} />
        <TabButton label="Wallet" active={activeTab === 'wallet'} onPress={() => setActiveTab('wallet')} />
      </View>
    </SafeAreaView>
  );
}

type TabButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function TabButton({ label, active, onPress }: TabButtonProps) {
  return (
    <TouchableOpacity style={[styles.tabButton, active && styles.tabButtonActive]} onPress={onPress}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text
  },
  headerMeta: {
    color: colors.muted,
    marginTop: 2
  },
  content: {
    flex: 1
  },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  loadingText: {
    color: colors.muted
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 8,
    gap: 8
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12
  },
  tabButtonActive: {
    backgroundColor: '#E8F0FF'
  },
  tabLabel: {
    color: colors.muted,
    fontWeight: '600'
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700'
  }
});
