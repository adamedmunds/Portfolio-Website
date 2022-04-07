import { isUndefined } from 'lodash';

const types = [
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], // Normal
  [1, 0.5, 2, 1, 0.5, 0.5, 1, 1, 2, 1, 1, 0.5, 2, 1, 1, 1, 0.5, 0.5], // Fire
  [1, 0.5, 0.5, 2, 2, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1], // Water
  [1, 1, 1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 0.5, 1], // Electric
  [1, 2, 0.5, 0.5, 0.5, 2, 1, 2, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 1], // Grass
  [1, 2, 1, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1], // Ice
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 0.5, 1, 1, 0.5, 1, 2], // Fighting
  [1, 1, 1, 1, 0.5, 1, 0.5, 0.5, 2, 1, 2, 0.5, 1, 1, 1, 1, 1, 0.5], // Poison
  [1, 1, 2, 0, 2, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1], // Ground
  [1, 1, 1, 2, 0.5, 2, 0.5, 1, 0, 1, 1, 0.5, 2, 1, 1, 1, 1, 1], // Flying
  [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 0.5, 2, 1, 2, 1, 2, 1, 1], // Psychic
  [1, 2, 1, 1, 0.5, 1, 0.5, 1, 0.5, 2, 1, 1, 2, 1, 1, 1, 1, 1], // Bug
  [0.5, 0.5, 2, 1, 2, 1, 2, 0.5, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 1], // Rock
  [0, 1, 1, 1, 1, 1, 0, 0.5, 1, 1, 1, 0.5, 1, 2, 1, 2, 1, 1], // Ghost
  [1, 0.5, 0.5, 0.5, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2], // Dragon
  [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 2, 1, 0.5, 1, 0.5, 1, 2], // Dark
  [0.5, 2, 1, 1, 0.5, 0.5, 2, 0, 2, 0.5, 0.5, 0.5, 0.5, 1, 0.5, 1, 0.5, 0.5], // Steel
  [1, 1, 1, 1, 1, 1, 0.5, 2, 1, 1, 1, 0.5, 1, 1, 0, 0.5, 2, 1], // Fairy
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // None
];

const convertType = (type) => {
  switch (type) {
    case 'normal':
      return 0;
    case 'fire':
      return 1;
    case 'water':
      return 2;
    case 'electric':
      return 3;
    case 'grass':
      return 4;
    case 'ice':
      return 5;
    case 'fighting':
      return 6;
    case 'poison':
      return 7;
    case 'ground':
      return 8;
    case 'flying':
      return 9;
    case 'psychic':
      return 10;
    case 'bug':
      return 11;
    case 'rock':
      return 12;
    case 'ghost':
      return 13;
    case 'dragon':
      return 14;
    case 'dark':
      return 15;
    case 'steel':
      return 16;
    case 'fairy':
      return 17;
    case 'none':
      return 18;
    case 0:
      return 'normal';
    case 1:
      return 'fire';
    case 2:
      return 'water';
    case 3:
      return 'electric';
    case 4:
      return 'grass';
    case 5:
      return 'ice';
    case 6:
      return 'fighting';
    case 7:
      return 'poison';
    case 8:
      return 'ground';
    case 9:
      return 'flying';
    case 10:
      return 'psychic';
    case 11:
      return 'bug';
    case 12:
      return 'rock';
    case 13:
      return 'ghost';
    case 14:
      return 'dragon';
    case 15:
      return 'dark';
    case 16:
      return 'steel';
    case 17:
      return 'fairy';
    case 18:
      return 'none';
    default:
      return '';
  }
};

export const calculateType = (type1, type2) => {
  if (isUndefined(type1)) type1 = 'none';
  if (isUndefined(type2)) type2 = 'none';
  var result = {};
  for (var i = 0; i < 18; i++) {
    result[convertType(i)] =
      types[convertType(type1)][i] * types[convertType(type2)][i];
  }
  return result;
};
