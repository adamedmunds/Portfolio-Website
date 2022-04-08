import { useState, useEffect } from 'react';
import { ButtonBase, Stack, Typography } from '@mui/material';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../../../../../Redux/actions';
import axios from 'axios';

import {
  toTitleCase,
  importAll,
} from '../../../../../../Utils/Resources/helperFunctions';

export const EvolutionCard = ({ data, isMulti }) => {
  const [images, setImages] = useState({});
  const dispatch = useDispatch();
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  const { newPokedexEntry, newEvoData, newCurrentPokemonEntry, updatePage } =
    bindActionCreators(actionCreators, dispatch);

  const handleClick = (id) => {
    newPokedexEntry(id);
    updatePage(id);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((result) => {
        newEvoData(result.data.evolution_chain.url);
        newCurrentPokemonEntry(result.data);
      });
  };

  useEffect(() => {
    setImages(
      importAll(
        require.context(
          '../../../../../../Utils/Resources/PokemonIcons',
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    );
  }, []);

  return (
    <Stack
      sx={{ height: '100%' }}
      direction='column'
      justifyContent='center'
      alignItems='center'
      textAlign='center'
    >
      <ButtonBase
        sx={{
          borderRadius: '20px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack
          justifyContent='center'
          alignItems='center'
          backgroundColor={
            currentPokemon.name === data.name ? '#B3B3B3' : '#E5E5E5'
          }
          p={2}
          borderRadius={5}
          onClick={() => handleClick(data.url.split('/')[6])}
          boxShadow={6}
          sx={{
            transition: '0.3s ease',
            '&:hover': {
              backgroundColor: '#B3B3B3',
            },
          }}
        >
          <img
            src={images[`${data.url.split('/')[6]}.png`]}
            alt={toTitleCase(data.name)}
            width={isMulti ? '20%' : '60%'}
          />
          <Typography gutterBottom variant='h5' component='div'>
            # {data.url.split('/')[6]}
          </Typography>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
          >
            {toTitleCase(data.name)}
          </Typography>
        </Stack>
      </ButtonBase>
    </Stack>
  );
};
