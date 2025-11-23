import { useEffect, useState } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type PokemonItem = {
  name: string;
  frontImage: string;
  backImage: string;
  types: string[];
};

export default function Index() {
  const [pokemon, setPokemon] = useState<PokemonItem[]>([]);

  const typeColors: Record<string, string> = {
    normal: '#F5F5DC',
    fire: '#FFE4B5',
    water: '#B0E0E6',
    electric: '#FFFACD',
    grass: '#D3F9D8',
    ice: '#E0FFFF',
    fighting: '#FFB6C1',
    poison: '#E6E6FA',
    ground: '#F5DEB3',
    flying: '#DDA0DD',
    psychic: '#FFB6C1',
    bug: '#F0E68C',
    rock: '#D2B48C',
    ghost: '#D8BFD8',
    dragon: '#DDA0DD',
    dark: '#D3D3D3',
    steel: '#F5F5F5',
    fairy: '#FFF0F5',
  };

  useEffect(() => {
    handlePokemon();
  }, []);

  async function handlePokemon(): Promise<void> {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await response.json();

      const updated: PokemonItem[] = await Promise.all(data.results.map(async (item: any) => {
        const detailResponse = await fetch(item.url);
        const detail = await detailResponse.json();
        const id = detail.id;

        return {
          name: item.name,
          frontImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          backImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
          types: detail.types.map((t: any) => t.type.name),
        };
      }));

      setPokemon(updated);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    
      <ScrollView style={{ paddingHorizontal: 20 }} contentContainerStyle={{ paddingBottom: 20 }}>
        {pokemon.map((p) => (
          <Link key={p.name} href={{ pathname: '/[name]', params: { name: p.name } }} asChild>
            <TouchableOpacity>
              <View style={{
                backgroundColor: typeColors[p.types[0]] || '#FFFFFF',
                padding: 15,
                marginVertical: 10,
                borderRadius: 15,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 5, textTransform: 'capitalize' }}>
                  {p.name}
                </Text>
                <Text style={{ fontSize: 16, color: '#555', marginBottom: 10, textTransform: 'capitalize' }}>
                  Type: {p.types.join(', ')}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Image source={{ uri: p.frontImage }} style={{ width: 120, height: 120, marginHorizontal: 10 }} />
                  <Image source={{ uri: p.backImage }} style={{ width: 120, height: 120, marginHorizontal: 10 }} />
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
