import { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { mockGigs } from './src/data/mockGigs';
import { CreateGigScreen } from './src/screens/CreateGigScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { WalletScreen } from './src/screens/WalletScreen';
import { colors } from './src/theme';
import { Gig, GigCategory } from './src/types';

type Tab = 'home' | 'create' | 'wallet';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [gigs, setGigs] = useState<Gig[]>(mockGigs);

  const openCount = useMemo(() => gigs.filter((gig) => gig.status === 'Open').length, [gigs]);

  const takeGig = (id: string) => {
    setGigs((prev) => prev.map((gig) => (gig.id === id ? { ...gig, status: 'In Progress' } : gig)));
  };

  const createGig = (payload: {
    title: string;
    description: string;
    budget: number;
    city: string;
    category: GigCategory;
  }) => {
    const newGig: Gig = {
      id: `g${Date.now()}`,
      title: payload.title,
      description: payload.description,
      budget: payload.budget,
      city: payload.city,
      category: payload.category,
      status: 'Open'
    };

    setGigs((prev) => [newGig, ...prev]);
    setActiveTab('home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.appTitle}>gigMobi</Text>
        <Text style={styles.headerMeta}>{openCount} open gigs</Text>
      </View>

      <View style={styles.content}>
        {activeTab === 'home' && <HomeScreen gigs={gigs} onTakeGig={takeGig} />}
        {activeTab === 'create' && <CreateGigScreen onCreateGig={createGig} />}
        {activeTab === 'wallet' && <WalletScreen gigs={gigs} />}
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
