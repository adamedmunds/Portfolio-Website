import { Slide } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { importAll } from '../../../../Utils/Resources/helperFunctions';

export const PokemonImage = () => {
  const [images, setImages] = useState({});
  const { data: pokedexData } = useSelector((state) => state.pokedex);

  useEffect(() => {
    setImages(
      importAll(
        require.context(
          '../../../../Utils/Resources/PokemonIcons',
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    );
  }, []);
  return (
    <Slide direction='right' in={true} timeout={700}>
      <div>
        <img
          src={images[`${pokedexData.id}.png`]}
          alt={`${pokedexData.name}`}
          width='90%'
        />
      </div>
    </Slide>
  );
};
