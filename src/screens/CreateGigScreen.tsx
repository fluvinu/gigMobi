import { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme';
import { GigCategory } from '../types';

type CreateGigScreenProps = {
  onCreateGig: (payload: {
    title: string;
    description: string;
    budget: number;
    city: string;
    category: GigCategory;
  }) => void;
};

const categories: GigCategory[] = ['Travel', 'Plumber', 'Walker', 'Delivery', 'Other'];

export function CreateGigScreen({ onCreateGig }: CreateGigScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [city, setCity] = useState('Austin');
  const [category, setCategory] = useState<GigCategory>('Other');

  const isValid = useMemo(() => {
    return title.trim().length > 2 && description.trim().length > 6 && Number(budget) > 0;
  }, [title, description, budget]);

  const submit = () => {
    if (!isValid) {
      Alert.alert('Missing info', 'Please fill all fields with valid values.');
      return;
    }

    onCreateGig({
      title: title.trim(),
      description: description.trim(),
      budget: Number(budget),
      city: city.trim(),
      category
    });

    setTitle('');
    setDescription('');
    setBudget('');
    setCategory('Other');
    Alert.alert('Gig created', 'Your gig is now visible to workers.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Post a Gig</Text>

      <TextInput value={title} onChangeText={setTitle} placeholder="Gig title" style={styles.input} />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Describe what needs to be done"
        multiline
        style={[styles.input, styles.textArea]}
      />
      <TextInput
        value={budget}
        onChangeText={setBudget}
        placeholder="Budget (USD)"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput value={city} onChangeText={setCity} placeholder="City" style={styles.input} />

      <View style={styles.categoryRow}>
        {categories.map((item) => {
          const selected = category === item;
          return (
            <Pressable
              key={item}
              style={[styles.categoryChip, selected && styles.categoryChipActive]}
              onPress={() => setCategory(item)}
            >
              <Text style={[styles.categoryText, selected && styles.categoryTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={[styles.button, !isValid && styles.buttonDisabled]} onPress={submit}>
        <Text style={styles.buttonLabel}>Publish Gig</Text>
      </Pressable>
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
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10
  },
  textArea: {
    minHeight: 88,
    textAlignVertical: 'top'
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 14
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  categoryChipActive: {
    borderColor: colors.primary,
    backgroundColor: '#E8F0FF'
  },
  categoryText: {
    color: colors.muted
  },
  categoryTextActive: {
    color: colors.primary,
    fontWeight: '700'
  },
  button: {
    marginTop: 'auto',
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 14
  },
  buttonDisabled: {
    opacity: 0.55
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '700'
  }
});
