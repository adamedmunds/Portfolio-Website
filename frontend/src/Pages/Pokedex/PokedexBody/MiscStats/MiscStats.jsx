import { Fragment, useRef } from 'react';
import { Grid, Slide } from '@mui/material';
import { useSelector } from 'react-redux';
import { Stat } from '../../../../Components/Stat';
import { convertName } from '../../../../Utils/Resources/helperFunctions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import darkTheme from '../../../../Utils/Themes/Dark';
import { useWindowDimensions } from '../../../../Hooks/useWindowDimensions';

export const MiscStats = () => {
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: currentPokemon } = useSelector((state) => state.currentPokemon);
  const containerRef = useRef(null);
  const { width } = useWindowDimensions();
  return currentPokemon ? (
    <Fragment>
      <Grid item mt={width >= 900 ? 7 : 2}>
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
          mt={7}
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
            />
          </Slide>
        </Grid>
      )}
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};
