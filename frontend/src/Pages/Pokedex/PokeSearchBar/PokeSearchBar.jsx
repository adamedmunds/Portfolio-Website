import {
  Autocomplete,
  Box,
  Container,
  createFilterOptions,
  Pagination,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  createContext,
  useContext,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../Redux/actions';
import axios from 'axios';
import { VariableSizeList } from 'react-window';
import { importAll } from '../../../Utils/Resources/helperFunctions';

export const PokeSearchBar = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [images, setImages] = useState({});
  const { data: reduxPokemonSearchData } = useSelector(
    (state) => state.pokemonList
  );
  const { newPokedexEntry, newPokedexEntryNoAPI } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (inputValue.length > 0) {
      setOpen(true);
    }
  };
  const handleInputChange = (_, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    newPokedexEntry(1);
    setImages(
      importAll(
        require.context(
          '../../../Utils/Resources/PokemonIcons',
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${e.toLowerCase()}`)
      .then((res) => {
        newPokedexEntryNoAPI(res.data);
        setPage(parseInt(res.data.id));
      });
  };

  const LISTBOX_PADDING = 8;

  const OuterElementContext = createContext({});

  const OuterElementType = forwardRef((props, ref) => {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  function useResetCache(data) {
    const ref = useRef(null);
    useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  }

  function renderRow(props) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
      ...style,
      top: style.top + LISTBOX_PADDING,
    };

    return (
      <Box component='li' {...dataSet[0]} noWrap style={inlineStyle}>
        <img
          src={images[`${dataSet[1].id}.png`]}
          alt=''
          width='30'
          loading='lazy'
        />
        <Typography mr={2} ml={1} variant='pokemonList'>
          #{dataSet[1].id}
        </Typography>
        <Typography variant='pokemonList'>{dataSet[1].name}</Typography>
      </Box>
    );
  }

  const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
      noSsr: true,
    });

    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = () => {
      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width='100%'
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType='ul'
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  });

  const filterOptions = createFilterOptions({
    stringify: (option) => option.name + option.id,
  });

  return (
    <Container maxWidth='xl' sx={{ zIndex: 1101, position: 'relative' }}>
      <Stack justifyContent='center' alignItems='center' mt={2} spacing={1}>
        <Pagination
          count={493}
          size='large'
          showFirstButton
          showLastButton
          siblingCount={8}
          onChange={(_, page) => {
            newPokedexEntry(page);
            setPage(page);
          }}
          color='paginationHighlight'
          page={page}
        />
        <Autocomplete
          id='pokemon-search-autocomplete'
          sx={{ width: 350 }}
          options={reduxPokemonSearchData}
          autoHighlight
          disableClearable
          clearOnBlur
          clearOnEscape
          ListboxComponent={ListboxComponent}
          getOptionLabel={(option) => option.name}
          filterOptions={filterOptions}
          renderOption={(props, option) => [props, option]}
          onChange={(_, data) => {
            handleSubmit(data.name);
          }}
          open={open}
          onOpen={handleOpen}
          onClose={() => setOpen(false)}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              id='pokemon-search-field'
              label='Pokemon Search'
              name='Pokemon Search'
              variant='standard'
              required
              color='inputColor'
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </Stack>
    </Container>
  );
};
