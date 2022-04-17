/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  convertName,
  moveIcons,
  getContestColor,
  convertContestName,
} from '../../../../Utils/Resources/helperFunctions';
import { types } from '../../../../Utils/Resources/typeExporter';
import { isEmpty, startCase } from 'lodash';
import pSBC from 'shade-blend-color';
import { CustomModal } from '../../../../Components/Modal';
import { ModalTheme } from '../../../../Utils/Themes/ModalTheme';
import reactStringReplace from 'react-string-replace';

export const MoveSet = () => {
  const { data: pokedexData } = useSelector((state) => state.pokedex);
  const { data: evolutionData } = useSelector((state) => state.evolutionData);
  const { data: version } = useSelector((state) => state.version);
  const [moveSet, setMoveSet] = useState([]);
  const [moveCount, setMoveCount] = useState({});
  const [modalDescription, setModalDescription] = useState('');
  const [isBusy, setBusy] = useState(true);
  const [moveTab, setMoveGroupTab] = useState('level-up');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleModalOpen = (data) => {
    setModalData(data);
    setIsModalOpen(true);
    var found = false;
    for (const entry of data.flavor_text_entries) {
      if (
        entry.language.name === 'en' &&
        entry.version_group.name === version
      ) {
        setModalDescription(entry.flavor_text);
        found = true;
        break;
      }
    }
    if (!found) {
      setModalDescription(
        `No description available for selected version: ${startCase(version)}`
      );
    }
  };

  const replacePercentages = (text) => {
    let replacedText = reactStringReplace(text, '$effect_chance%', (match) => (
      <span key={match}>{modalData.effect_chance}%</span>
    ));
    replacedText = reactStringReplace(
      replacedText,
      '(100 - accuracy)%',
      (match) => <span key={match}>{100 - modalData.accuracy}%</span>
    );
    return replacedText;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(async () => {
    setBusy(true);
    if (pokedexData) {
      setMoveGroupTab('level-up');
      const moveData = [];
      const count = { 'level-up': 0, machine: 0, egg: 0, tutor: 0 };
      for await (const move of pokedexData.moves) {
        for await (const details of move.version_group_details) {
          if (details.version_group.name === version) {
            await axios.get(move.move.url).then((res) => {
              res.data['learnt_at'] = details.level_learned_at;
              res.data['method'] = details.move_learn_method.name;
              moveData.push(res.data);
              count[details.move_learn_method.name] += 1;
              res.data.machines.map((machine) => {
                if (machine.version_group.name === version) {
                  axios.get(machine.machine.url).then((res2) => {
                    res.data['machine_name'] = res2.data.item.name;
                  });
                }
              });
            });
          }
        }
      }
      setMoveCount(count);
      setMoveSet(moveData.sort((a, b) => a.learnt_at - b.learnt_at));
    }
    setBusy(false);
  }, [pokedexData, version]);

  const handleChange = (_, newValue) => {
    setMoveGroupTab(newValue);
  };

  const levelHeader = moveTab === 'level-up' ? 'Level' : '-';

  const columns = [
    { id: levelHeader, label: levelHeader, maxWidth: 5 },
    { id: 'Move', label: 'Move', minWidth: 100 },
    {
      id: 'Type',
      label: 'Type',
      minWidth: 50,
    },
    {
      id: 'Category',
      label: 'Category',
      minWidth: 50,
    },
    {
      id: 'Power',
      label: 'Power',
      minWidth: 50,
    },
    {
      id: 'PP',
      label: 'PP',
      minWidth: 50,
    },
    {
      id: 'Accuracy',
      label: 'Accuracy',
      minWidth: 50,
    },
    {
      id: 'Priority',
      label: 'Priority',
      minWidth: 50,
    },
    {
      id: 'Generation',
      label: 'Generation',
      minWidth: 50,
    },
  ];

  return isBusy ? (
    evolutionData ? (
      <Stack direction='row' width justifyContent='center' spacing={2} mt={5}>
        <Typography
          variant='h2'
          fontWeight={500}
          fontSize='3rem'
          textAlign='center'
          sx={{
            minHeight: '80vh',
          }}
        >
          Moves
        </Typography>
        <CircularProgress sx={{ color: 'black' }} />
      </Stack>
    ) : (
      <Fragment></Fragment>
    )
  ) : (
    evolutionData && (
      <Container
        maxWidth='false'
        sx={{
          minHeight: '80vh',
        }}
      >
        <Typography
          variant='h2'
          mt={5}
          mb={2}
          textAlign='center'
          fontWeight={500}
          fontSize='3rem'
        >
          Moves
        </Typography>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{ width: '100%' }}
          mb={3}
        >
          <Tabs
            value={moveTab}
            onChange={handleChange}
            variant='scrollable'
            allowScrollButtonsMobile
            scrollButtons='auto'
            textColor='inherit'
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'black',
              },
            }}
          >
            <Tab value='level-up' label='Level Up' sx={{ typography: 'h6' }} />
            <Tab value='machine' label='Hm / TM' sx={{ typography: 'h6' }} />
            <Tab value='egg' label='Egg' sx={{ typography: 'h6' }} />
            <Tab value='tutor' label='Tutor' sx={{ typography: 'h6' }} />
          </Tabs>
        </Box>
        {moveSet.length > 0 ? (
          <Container maxWidth='xl'>
            {moveCount[moveTab] > 0 ? (
              <Paper
                elevation={2}
                sx={{
                  width: '100%',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  backgroundColor: 'black',
                  margin: 'auto',
                  mb: 5,
                }}
              >
                <TableContainer
                  sx={{
                    display: 'block',
                    maxHeight: 640,
                  }}
                >
                  <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align='center'
                            sx={{
                              backgroundColor: 'black',
                              color: 'white',
                              border: 'none',
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: '#E5E5E5' }}>
                      {moveSet.map((row) => {
                        if (row.method === moveTab) {
                          return (
                            <TableRow
                              key={`${row.name} ${row.method} ${row.learnt_at}`}
                              hover
                              role='checkbox'
                              sx={{ '&:hover': { cursor: 'pointer' } }}
                              onClick={() => {
                                handleModalOpen(row);
                              }}
                            >
                              <TableCell align='center'>
                                {moveTab === 'level-up' && (
                                  <Typography>{row.learnt_at}</Typography>
                                )}
                                {moveTab === 'machine' && (
                                  <Typography
                                    sx={{ textTransform: 'uppercase' }}
                                  >
                                    {row.machine_name}
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell align='center'>
                                <Typography>{startCase(row.name)}</Typography>
                              </TableCell>
                              <TableCell align='center'>
                                <Tooltip
                                  title={startCase(row.type.name)}
                                  key={row.type.name}
                                >
                                  <Box
                                    component='img'
                                    boxShadow={4}
                                    src={types[row.type.name].icon}
                                    alt={row.type.name}
                                    sx={{
                                      background: pSBC(
                                        0.3,
                                        types[row.type.name].color,
                                        '#FFF'
                                      ),
                                      borderRadius: '50%',
                                      p: 1,
                                      maxWidth: '45px',
                                      boxShadow: `0 0 1em ${
                                        types[row.type.name].color
                                      }`,
                                      border: `1px solid ${pSBC(
                                        0.2,
                                        types[row.type.name].color,
                                        '#FFF'
                                      )}`,
                                    }}
                                  />
                                </Tooltip>
                              </TableCell>
                              <TableCell align='center'>
                                <Tooltip
                                  title={startCase(row.damage_class.name)}
                                  key={row.damage_class.name}
                                >
                                  <Box
                                    component='img'
                                    boxShadow={4}
                                    src={moveIcons[row.damage_class.name].icon}
                                    alt={row.damage_class.namee}
                                    sx={{
                                      borderRadius: '50%',
                                      p: 1,
                                      maxWidth: '45px',
                                      border: '1px solid rgba(0,0,0,0.2)',
                                    }}
                                  />
                                </Tooltip>
                              </TableCell>
                              <TableCell align='center'>
                                <Typography>{row.power || '—'}</Typography>
                              </TableCell>
                              <TableCell align='center'>
                                <Typography>{row.pp || '—'}</Typography>
                              </TableCell>
                              <TableCell align='center'>
                                <Typography>{row.accuracy || '—'}</Typography>
                              </TableCell>
                              <TableCell align='center'>
                                <Typography>{row.priority}</Typography>
                              </TableCell>
                              <TableCell align='center'>
                                {convertName(row.generation.name.split('-')[1])}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {modalData && !isEmpty(modalData) && (
                  <CustomModal
                    open={isModalOpen}
                    close={handleModalClose}
                    layout={
                      <Box
                        sx={ModalTheme('75%')}
                        textAlign='center'
                        justifyContent='center'
                        alignItems='center'
                        boxShadow={5}
                      >
                        <Typography variant='h3' mb={1}>
                          {startCase(modalData.name)}
                        </Typography>
                        <Divider color='black' />
                        <Grid
                          container
                          justifyContent='center'
                          alignItems='center'
                          mt={2}
                          mb={2}
                        >
                          <Grid item xs={12} md={4}>
                            <Stack
                              direction='row'
                              justifyContent='center'
                              alignItems='center'
                            >
                              <Box
                                p={1}
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                minHeight='60px'
                                minWidth='150px'
                                sx={{
                                  background: pSBC(
                                    0.3,
                                    types[modalData.type.name].color,
                                    '#FFF'
                                  ),
                                  borderRadius: 2,
                                  boxShadow: `0 0 1em ${
                                    types[modalData.type.name].color
                                  }`,
                                  border: `1px solid ${pSBC(
                                    0.2,
                                    types[modalData.type.name].color,
                                    '#FFF'
                                  )}`,
                                }}
                              >
                                <Typography
                                  variant='body1'
                                  fontWeight='bold'
                                  mr={1}
                                >
                                  {startCase(modalData.type.name)}
                                </Typography>
                                <Box
                                  component='img'
                                  src={types[modalData.type.name].icon}
                                  alt={modalData.type.name}
                                  sx={{
                                    maxWidth: '35px',
                                  }}
                                />
                              </Box>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={4} mt={{ xs: 2, md: 0 }}>
                            <Stack
                              direction='row'
                              justifyContent='center'
                              alignItems='center'
                            >
                              <Box
                                p={1}
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                minHeight='60px'
                                minWidth='150px'
                                sx={{
                                  background: pSBC(
                                    0.3,
                                    moveIcons[modalData.damage_class.name]
                                      .color,
                                    '#FFF'
                                  ),
                                  borderRadius: 2,
                                  boxShadow: `0 0 1em ${
                                    moveIcons[modalData.damage_class.name].color
                                  }`,
                                  border: `1px solid ${pSBC(
                                    0.2,
                                    moveIcons[modalData.damage_class.name]
                                      .color,
                                    '#FFF'
                                  )}`,
                                }}
                              >
                                <Typography
                                  variant='body1'
                                  fontWeight='bold'
                                  mr={1}
                                >
                                  {startCase(modalData.damage_class.name)}
                                </Typography>
                                <Box
                                  component='img'
                                  src={
                                    moveIcons[modalData.damage_class.name].icon
                                  }
                                  alt={modalData.damage_class.name}
                                  sx={{
                                    maxWidth: '45px',
                                  }}
                                />
                              </Box>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={4} mt={{ xs: 2, md: 0 }}>
                            <Stack
                              direction='row'
                              justifyContent='center'
                              alignItems='center'
                            >
                              <Box
                                p={1}
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                minHeight='60px'
                                minWidth='150px'
                                sx={{
                                  background: pSBC(
                                    0.3,
                                    getContestColor(modalData),
                                    '#FFF'
                                  ),
                                  borderRadius: 2,
                                  boxShadow: `0 0 1em ${getContestColor(
                                    modalData
                                  )}`,
                                  border: `1px solid ${pSBC(
                                    0.2,
                                    getContestColor(modalData),
                                    '#FFF'
                                  )}`,
                                }}
                              >
                                <Typography
                                  variant='body1'
                                  fontWeight='bold'
                                  mr={1}
                                >
                                  {convertContestName(modalData)}
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Divider color='black' />
                        <Grid
                          container
                          justifyContent='center'
                          alignItems='center'
                          mt={2}
                          mb={2}
                        >
                          <Grid item xs={12} md={3}>
                            <Stack>
                              <Typography
                                variant='h5'
                                fontWeight='500'
                                color={pSBC(
                                  0.25,
                                  types[modalData.type.name].color,
                                  '#000'
                                )}
                              >
                                {modalData.power || 'N/A'}
                              </Typography>
                              <Typography variant='h5' fontWeight='500'>
                                Power
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Stack>
                              <Typography
                                variant='h5'
                                fontWeight='500'
                                color={pSBC(
                                  0.25,
                                  types[modalData.type.name].color,
                                  '#000'
                                )}
                              >
                                {modalData.accuracy || 'N/A'}
                              </Typography>
                              <Typography variant='h5' fontWeight='500'>
                                Accuracy
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Stack>
                              <Typography
                                variant='h5'
                                fontWeight='500'
                                color={pSBC(
                                  0.25,
                                  types[modalData.type.name].color,
                                  '#000'
                                )}
                              >
                                {modalData.pp || 'N/A'}
                              </Typography>
                              <Typography variant='h5' fontWeight='500'>
                                PP
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Stack>
                              <Typography
                                variant='h5'
                                fontWeight='500'
                                color={pSBC(
                                  0.25,
                                  types[modalData.type.name].color,
                                  '#000'
                                )}
                              >
                                {modalData.priority}
                              </Typography>
                              <Typography variant='h5' fontWeight='500'>
                                Priority
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                        <Divider color='black' />
                        <Box mt={2}>
                          <Typography
                            variant='h6'
                            sx={{
                              fontSize: '1.75rem',
                              fontWeight: '500',
                              color: 'rgb(0 0 0 / 80%)',
                            }}
                          >
                            Description
                          </Typography>
                          <Typography
                            variant='body1'
                            mb={2}
                            sx={{
                              fontfamily: "'Rubik', sans-serif",
                              fontWeight: '500',
                            }}
                          >
                            {modalDescription}
                          </Typography>
                          {modalData.effect_entries.map((entry) => {
                            if (entry.language.name === 'en') {
                              return (
                                <Fragment key={entry.effect}>
                                  <Typography
                                    variant='h6'
                                    sx={{
                                      fontSize: '1.75rem',
                                      fontWeight: '500',
                                      color: 'rgb(0 0 0 / 80%)',
                                    }}
                                  >
                                    Effect
                                  </Typography>
                                  <Typography
                                    variant='body1'
                                    mb={2}
                                    sx={{
                                      fontfamily: "'Rubik', sans-serif",
                                      fontWeight: '500',
                                    }}
                                  >
                                    {reactStringReplace(
                                      entry.short_effect,
                                      '$effect_chance%',
                                      () => (
                                        <span key={entry.short_effect}>
                                          {modalData.effect_chance}%
                                        </span>
                                      )
                                    )}
                                  </Typography>
                                  <Typography
                                    variant='h6'
                                    sx={{
                                      fontSize: '1.75rem',
                                      fontWeight: '500',
                                      color: 'rgb(0 0 0 / 80%)',
                                    }}
                                  >
                                    Detailed Effect
                                  </Typography>
                                  <Typography
                                    variant='body1'
                                    mb={2}
                                    sx={{
                                      fontfamily: "'Rubik', sans-serif",
                                      fontWeight: '500',
                                    }}
                                  >
                                    {replacePercentages(entry.effect)}
                                  </Typography>
                                </Fragment>
                              );
                            }
                          })}
                        </Box>
                        <Divider color='black' sx={{ marginTop: '16px' }} />
                        <Button
                          onClick={handleModalClose}
                          sx={{
                            color: 'white',
                            marginTop: '8px',
                            fontWeight: 'bold',
                            backgroundColor: '#24252a',
                            '&:hover': {
                              backgroundColor: '#757889',
                            },
                          }}
                          variant='contained'
                        >
                          Back
                        </Button>
                      </Box>
                    }
                  />
                )}
              </Paper>
            ) : (
              <Typography variant='h4' textAlign='center'>
                No moves found
              </Typography>
            )}
          </Container>
        ) : (
          <Typography
            variant='h5'
            mt={5}
            mb={2}
            textAlign='center'
            fontWeight={500}
            fontSize='2rem'
          >
            No Moves for version: {startCase(version)}
          </Typography>
        )}
      </Container>
    )
  );
};
