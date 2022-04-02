import { useSelector } from 'react-redux';

export const PokemonImage = ({ images }) => {
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  return (
    <img
      src={images[`${pokedexData.id}.png`]}
      alt={`${pokedexData.name}`}
      style={{
        zIndex: '-1',
        position: 'absolute',
        top: '50%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};
