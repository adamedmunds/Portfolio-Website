import { Fragment, useEffect, useRef } from 'react';
import { Grid, Slide } from '@mui/material';
import { useSelector } from 'react-redux';
import { Stat } from '../../../../Components/Stat';
import { convertName } from '../../../../Utils/Resources/helperFunctions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import darkTheme from '../../../../Utils/Themes/Dark';
import { useWindowDimensions } from '../../../../Hooks/useWindowDimensions';

export const MiscStats = ({ scrollRef }) => {
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  const containerRef = useRef(null);
  const { width } = useWindowDimensions();

  const handleClick = () => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return currentPokemon ? (
    <Fragment>
      <Grid item mt={width >= 900 ? 5 : 2}>
        <Stat stat={`Height: ${pokedexData.height / 10}m`} />
        <Stat stat={`Weight: ${pokedexData.weight / 10}kg`} />
        <Stat
          stat={`Shape: ${
            currentPokemon.shape ? currentPokemon.shape.name : 'Unknown'
          }`}
        />
        <Stat stat={`Color: ${currentPokemon.color.name}`} />
        <Stat
          stat={`Generation: ${convertName(
            currentPokemon.generation.name.split('-')[1]
          )}`}
        />
      </Grid>
      {width >= 900 && (
        <Grid
          item
          container
          xs
          justifyContent='center'
          alignItems='flex-end'
          ref={containerRef}
          overflow='hidden'
        >
          <Slide
            direction='down'
            appear
            in
            container={containerRef.current}
            easing={{
              enter: darkTheme.transitions.easing.easeOut,
            }}
            timeout={{
              enter: darkTheme.transitions.duration.enteringScreen,
            }}
          >
            <KeyboardArrowDownIcon
              style={{
                fontSize: '100',
              }}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                  transition: '0.2s ease-in-out',
                  transform: 'scale(1.25) !important',
                },
              }}
              onClick={() => handleClick()}
            />
          </Slide>
        </Grid>
      )}
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};
