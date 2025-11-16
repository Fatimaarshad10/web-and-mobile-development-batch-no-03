import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';

type PokemonDetail = {
  name: string;
  id: number;
  types: string[];
  height: number;
  weight: number;
  frontImage: string;
  backImage: string;
  stats: { name: string; value: number }[];
  abilities: string[];
};

export default function PokemonDetail() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (name) {
      fetchPokemonDetail(name);
    }
  }, [name]);

  async function fetchPokemonDetail(pokemonName: string) {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();

      const detail: PokemonDetail = {
        name: data.name,
        id: data.id,
        types: data.types.map((t: any) => t.type.name),
        height: data.height,
        weight: data.weight,
        frontImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        backImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${data.id}.png`,
        stats: data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
        abilities: data.abilities.map((a: any) => a.ability.name),
      };

      setPokemon(detail);
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : 'Failed to load Pokemon');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <Text style={{ fontSize: 18, color: '#666' }}>Loading Pokemon details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 }}>
        <Text style={{ fontSize: 18, color: '#d32f2f', textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <Text style={{ fontSize: 18, color: '#666' }}>Pokemon not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#333', textTransform: 'capitalize', marginBottom: 10 }}>
          {pokemon.name}
        </Text>
        <Text style={{ fontSize: 18, textAlign: 'center', color: '#666', textTransform: 'capitalize', marginBottom: 20 }}>
          Type: {pokemon.types.join(', ')}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
          <Image source={{ uri: pokemon.frontImage }} style={{ width: 150, height: 150, marginHorizontal: 10, borderRadius: 10 }} />
          <Image source={{ uri: pokemon.backImage }} style={{ width: 150, height: 150, marginHorizontal: 10, borderRadius: 10 }} />
        </View>
      </View>

      <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Physical Details</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: '#666' }}>Height</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{pokemon.height / 10} m</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, color: '#666' }}>Weight</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{pokemon.weight / 10} kg</Text>
        </View>
      </View>

      <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 20, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Base Stats</Text>
        {pokemon.stats.map((stat) => (
          <View key={stat.name} style={{ marginBottom: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize', color: '#333' }}>{stat.name}</Text>
              <Text style={{ fontSize: 16, color: '#666' }}>{stat.value}</Text>
            </View>
            <View style={{ height: 8, backgroundColor: '#e0e0e0', borderRadius: 4 }}>
              <View style={{ height: 8, width: `${(stat.value / 255) * 100}%`, backgroundColor: '#4CAF50', borderRadius: 4 }} />
            </View>
          </View>
        ))}
      </View>

      <View style={{ backgroundColor: '#fff', borderRadius: 15, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' }}>Abilities</Text>
        <Text style={{ fontSize: 16, color: '#666', textTransform: 'capitalize' }}>{pokemon.abilities.join(', ')}</Text>
      </View>
    </ScrollView>
  );
}