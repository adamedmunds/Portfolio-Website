import { isNull, startCase } from 'lodash';
import physical from './PokemonIcons/physical.png';
import special from './PokemonIcons/special.png';
import status from './PokemonIcons/status.png';
import pSBC from 'shade-blend-color';

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const importAll = (r) => {
  let images = {};
  // eslint-disable-next-line array-callback-return
  r.keys().map((item, _) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

export const convertName = (translation) => {
  switch (translation) {
    case 'i':
      return 'One';
    case 'ii':
      return 'Two';
    case 'iii':
      return 'Three';
    case 'iv':
      return 'Four';
    case 'v':
      return 'Five';
    case 'vi':
      return 'Six';
    case 'vii':
      return 'Seven';
    case 'viii':
      return 'Eight';
    case 'ix':
      return 'Nine';
    case 'dawn-stone':
      return 'Dawn Stone';
    case 'dusk-stone':
      return 'Dusk Stone';
    case 'shiny-stone':
      return 'Shiny Stone';
    case 'sun-stone':
      return 'Sun Stone';
    case 'moon-stone':
      return 'Moon Stone';
    case 'water-stone':
      return 'Water Stone';
    case 'fire-stone':
      return 'Fire Stone';
    case 'leaf-stone':
      return 'Leaf Stone';
    case 'thunder-stone':
      return 'Thunder Stone';
    case 'kings-rock':
      return "King's Rock";
    case 'metal-coat':
      return 'Metal Coat';
    case 'protector':
      return 'Protector';
    case 'dragon-scale':
      return 'Dragon Scale';
    case 'electirizer':
      return 'Electirizer';
    case 'magmarizer':
      return 'Magmarizer';
    case 'dubious-disc':
      return 'Dubious Disc';
    case 'deep-sea-scale':
      return 'Deep Sea Scale';
    case 'deep-sea-tooth':
      return 'Deep Sea Tooth';
    case 'reaper-cloth':
      return 'Reaper Cloth';
    case 'oval-stone':
      return 'Oval Stone';
    case 'razor-claw':
      return 'Razor Claw';
    case 'razor-fang':
      return 'Razor Fang';
    case 'mt-coronet':
      return 'Mt. Coronet';
    case 'rollout':
      return 'Rollout';
    case 'ancient-power':
      return 'Ancient Power';
    case 'mimic':
      return 'Mimic';
    case 'up-grade':
      return 'Up-Grade';
    case 'double-hit':
      return 'Double Hit';
    case 'eterna-forest':
      return 'Eterna Forest';
    case 'sinnoh-route-217':
      return 'Sinnoh Route 217';
    case 'fairy':
      return 'Fairy';
    case 'omega-ruby':
      return 'Omega Ruby';
    case 'alpha-sapphire':
      return 'Alpha Sapphire';
    case 'lets-go-eevee':
      return "Let's Go Eevee";
    case 'lets-go-pikachu':
      return "Let's Go Pikachu";
    case 'red':
      return 'Red';
    case 'blue':
      return 'Blue';
    case 'yellow':
      return 'Yellow';
    case 'gold':
      return 'Gold';
    case 'silver':
      return 'Silver';
    case 'crystal':
      return 'Crystal';
    case 'ruby':
      return 'Ruby';
    case 'sapphire':
      return 'Sapphire';
    case 'emerald':
      return 'Emerald';
    case 'firered':
      return 'Fire Red';
    case 'leafgreen':
      return 'Leaf Green';
    case 'heartgold':
      return 'Heart Gold';
    case 'soulsilver':
      return 'Soul Silver';
    case 'black':
      return 'Black';
    case 'white':
      return 'White';
    case 'black-2':
      return 'Black 2';
    case 'white-2':
      return 'White 2';
    case 'x':
      return 'X';
    case 'y':
      return 'Y';
    case 'diamond':
      return 'Diamond';
    case 'pearl':
      return 'Pearl';
    case 'platinum':
      return 'Platinum';
    case 'sword':
      return 'Sword';
    case 'shield':
      return 'Shield';
    case 'tart-apple':
      return 'Tart Apple';
    case 'sweet-apple':
      return 'Sweet Apple';
    case 'sun':
      return 'Sun';
    case 'moon':
      return 'Moon';
    case 'ultra-sun':
      return 'Ultra Sun';
    case 'ultra-moon':
      return 'Ultra Moon';
    case 'sea-incense':
      return 'Sea Incense';
    case 'lax-incense':
      return 'Lax Incense';
    case 'rose-incense':
      return 'Rose Incense';
    case 'wave-incense':
      return 'Wave Incense';
    case 'full-incense':
      return 'Full Incense';
    case 'luck-incense':
      return 'Luck Incense';
    case 'pure-incense':
      return 'Pure Incense';
    case 'rock-incense':
      return 'Rock Incense';
    case 'odd-incense':
      return 'Odd Incense';
    case 'special-attack':
      return 'Special Attack';
    case 'special-defense':
      return 'Special Defense';
    case 'speed':
      return 'Speed';
    case 'hp':
      return 'HP';
    case 'attack':
      return 'Attack';
    case 'defense':
      return 'Defense';
    case 'grassland':
      return 'Grassland';
    case 'mountain':
      return 'Mountain';
    case 'forest':
      return 'Forest';
    case 'waters-edge':
      return "Water's Edge";
    case 'sea':
      return 'Sea';
    case 'cave':
      return 'Cave';
    case 'rough-terrain':
      return 'Rough Terrain';
    case 'urban':
      return 'Urban';
    case 'rare':
      return 'Rare';
    case 'medium-slow':
      return 'Medium Slow (1,059,860 Exp.)';
    case 'medium':
      return 'Medium (1,000,000 Exp.)';
    case 'slow':
      return 'Slow (1,250,000 Exp.)';
    case 'fast':
      return 'Fast (800,000 Exp.)';
    case 'slow-then-very-fast':
      return 'Slow then Very Fast (600,000 Exp.)';
    case 'fast-then-very-slow':
      return 'Fast then Very Slow (1,640,000 Exp.)';
    case 'big-pearl':
      return 'Big Pearl';
    case 'oran-berry':
      return 'Oran Berry';
    case 'sitrus-berry':
      return 'Sitrus Berry';
    case 'figy-berry':
      return 'Figy Berry';
    case 'wiki-berry':
      return 'Wiki Berry';
    case 'mago-berry':
      return 'Mago Berry';
    case 'aguav-berry':
      return 'Aguav Berry';
    case 'iapapa-berry':
      return 'Iapapa Berry';
    case 'razz-berry':
      return 'Razz Berry';
    case 'bluk-berry':
      return 'Bluk Berry';
    case 'nanab-berry':
      return 'Nanab Berry';
    case 'wepear-berry':
      return 'Wepear Berry';
    case 'pinap-berry':
      return 'Pinap Berry';
    case 'pomeg-berry':
      return 'Pomeg Berry';
    case 'kebia-berry':
      return 'Kebia Berry';
    case 'shuca-berry':
      return 'Shuca Berry';
    case 'custap-berry':
      return 'Custap Berry';
    case 'jaboca-berry':
      return 'Jaboca Berry';
    case 'rowap-berry':
      return 'Rowap Berry';
    case 'rare-candy':
      return 'Rare Candy';
    case 'comet-shard':
      return 'Comet Shard';
    case 'durin-berry':
      return 'Durin Berry';
    case 'belue-berry':
      return 'Belue Berry';
    case 'leppa-berry':
      return 'Leppa Berry';
    case 'lucky-punch':
      return 'Lucky Punch';
    case 'lucky-egg':
      return 'Lucky Egg';
    case 'spell-tag':
      return 'Spell Tag';
    case 'silver-powder':
      return 'Silver Powder';
    case 'poison-barb':
      return 'Poison Barb';
    case 'chilan-berry':
      return 'Chilan Berry';
    case 'sharp-beak':
      return 'Sharp Beak';
    case 'light-ball':
      return 'Light Ball';
    case 'quick-claw':
      return 'Quick Claw';
    case 'grip-claw':
      return 'Grip Claw';
    case 'soft-sand':
      return 'Soft Sand';
    case 'rawst-berry':
      return 'Rawst Berry';
    case 'charcoal':
      return 'Charcoal';
    case 'absorb-bulb':
      return 'Absorb Bulb';
    case 'tiny-mushroom':
      return 'Tiny Mushroom';
    case 'big-mushroom':
      return 'Big Mushroom';
    case 'balm-mushroom':
      return 'Balm Mushroom';
    case 'shed-shell':
      return 'Shed Shell';
    case 'nugget':
      return 'Nugget';
    case 'payapa-berry':
      return 'Payapa Berry';
    case 'twisted-spoon':
      return 'Twisted Spoon';
    case 'focus-band':
      return 'Focus Band';
    case 'everstone':
      return 'Everstone';
    case 'hard-stone':
      return 'Hard Stone';
    case 'lagging-tail':
      return 'Lagging Tail';
    case 'magnet':
      return 'Magnet';
    case 'stick':
      return 'Stick';
    case 'aspear-berry':
      return 'Aspear Berry';
    case 'never-melt-ice':
      return 'Never Melt Ice';
    case 'black-sludge':
      return 'Black Sludge';
    case 'toxic-orb':
      return 'Toxic Orb';
    case 'psychic-seed':
      return 'Psychic Seed';
    case 'thick-club':
      return 'Thick Club';
    case 'white-herb':
      return 'White Herb';
    case 'macho-brace':
      return 'Macho Brace';
    case 'power-herb':
      return 'Power Herb';
    case 'soul-dew':
      return 'Soul Dew';
    case 'choices-scarf':
      return 'Choices Scarf';
    case 'choices-specs':
      return 'Choices Specs';
    case 'choices-band':
      return 'Choices Band';
    case 'exp-share':
      return 'Exp Share';
    case 'quick-powder':
      return 'Quick Powder';
    case 'zoom-lens':
      return 'Zoom Lens';
    case 'muscle-band':
      return 'Muscle Band';
    case 'wise-glasses':
      return 'Wise Glasses';
    case 'power-lens':
      return 'Power Lens';
    case 'power-band':
      return 'Power Band';
    case 'smoke-ball':
      return 'Smoke Ball';
    case 'mystic-water':
      return 'Mystic Water';
    case 'stardust':
      return 'Stardust';
    case 'star-piece':
      return 'Star Piece';
    case 'metal-powder':
      return 'Metal Powder';
    case 'chesto-berry':
      return 'Chesto Berry';
    case 'leftovers':
      return 'Leftovers';
    case 'dragon-fang':
      return 'Dragon Fang';
    case 'lum-berry':
      return 'Lum Berry';
    case 'yellow-shard':
      return 'Yellow Shard';
    case 'coba-berry':
      return 'Coba Berry';
    case 'wide-lens':
      return 'Wide Lens';
    case 'persim-berry':
      return 'Persim Berry';
    case 'berry-juice':
      return 'Berry Juice';
    case 'red-shard':
      return 'Red Shard';
    case 'luminous-moss':
      return 'Luminous Moss';
    case 'passho-berry':
      return 'Passho Berry';
    case 'moomoo-milk':
      return 'Moomoo Milk';
    case 'sacred-ash':
      return 'Sacred Ash';
    case 'pecha-berry':
      return 'Pecha Berry';
    case 'potion':
      return 'Potion';
    case 'revive':
      return 'Revive';
    case 'max-revive':
      return 'Max Revive';
    case 'bright-powder':
      return 'Bright Powder';
    case 'mental-herb':
      return 'Mental Herb';
    case 'charti-berry':
      return 'Charti Berry';
    case 'pretty-wing':
      return 'Pretty Wing';
    case 'honey':
      return 'Honey';
    case 'black-belt':
      return 'Black Belt';
    case 'occa-berry':
      return 'Occa Berry';
    case 'iron-ball':
      return 'Iron Ball';
    case 'cell-battery':
      return 'Cell Battery';
    case 'tanga-berry':
      return 'Tanga Berry';
    case 'sticky-barb':
      return 'Sticky Barb';
    case 'light-clay':
      return 'Light Clay';
    case 'big-root':
      return 'Big Root';
    case 'kasib-berry':
      return 'Kasib Berry';
    case 'colbur-berry':
      return 'Colbur Berry';
    case 'cleanse-tag':
      return 'Cleanse Tag';
    case 'life-orb':
      return 'Life Orb';
    case 'babiri-berry':
      return 'Babiri Berry';
    case 'snowball':
      return 'Snowball';
    case 'blue-shard':
      return 'Blue Shard';
    case 'green-shard':
      return 'Green Shard';
    case 'heart-scale':
      return 'Heart Scale';
    case 'yache-berry':
      return 'Yache Berry';
    case 'metronome':
      return 'Metronome';
    case 'wacan-berry':
      return 'Wacan Berry';
    case 'miracle-seed':
      return 'Miracle Seed';
    case 'air-balloon':
      return 'Air Balloon';
    case 'chople-berry':
      return 'Chople Berry';
    case 'cheri-berry':
      return 'Cheri Berry';
    case 'haban-berry':
      return 'Haban Berry';
    case 'rindo-berry':
      return 'Rindo Berry';
    case 'expert-belt':
      return 'Expert Belt';
    case 'black-glasses':
      return 'Black Glasses';
    case 'rare-bone':
      return 'Rare Bone';
    case 'silk-scarf':
      return 'Silk Scarf';
    case 'big-nugget':
      return 'Big Nugget';
    case 'flame-orb':
      return 'Flame Orb';
    case 'sachet':
      return 'Sachet';
    case 'whipped-dream':
      return 'Whipped Dream';
    case 'mount-lanakila':
      return 'Mount Lanakila';
    case 'grassy-seed':
      return 'Grassy Seed';
    case 'stomp':
      return 'Stomp';
    case 'misty-seed':
      return 'Misty Seed';
    case 'electric-seed':
      return 'Electric Seed';
    case 'dragon-pulse':
      return 'Dragon Pulse';
    case 'taunt':
      return 'Taunt';
    case 'cracked-pot':
      return 'Cracked Pot';
    default:
      console.log(translation);
      return 'Unknown';
  }
};

export const getEvolutionTrigger = (input) => {
  if (input === undefined) return;
  const trigger = input.trigger.name;
  var returnValue;

  if (trigger === 'use-item') {
    returnValue = `Use ${convertName(input.item.name)}`;
  } else if (trigger === 'trade') {
    const needsItem = input.held_item === null;
    returnValue = `Trade ${
      !needsItem ? `holding ${convertName(input.held_item.name)}` : ''
    }`;
  } else if (trigger === 'level-up') {
    if (input.min_level != null) {
      returnValue = `Level ${input.min_level}+`;
    } else if (input.min_happiness != null) {
      returnValue = `Level up with ${input.min_happiness}+ happiness`;
    } else if (input.min_beauty != null) {
      returnValue = `Level up with ${input.min_beauty}+ beauty`;
    } else if (input.location != null) {
      returnValue = `Level up at ${convertName(input.location.name)}`;
    } else if (input.known_move != null) {
      returnValue = `Level up knowing ${convertName(input.known_move.name)}`;
    } else if (input.held_item != null) {
      returnValue = `Level up holding ${convertName(input.held_item.name)}`;
    } else if (input.known_move_type != null) {
      returnValue = `Level up knowing a ${convertName(
        input.known_move_type.name
      )} move`;
    }
  } else if (trigger === 'three-critical-hits') {
    returnValue = `Three critical hits in one battle`;
  } else if (trigger === 'shed') {
    returnValue = 'Level 20, with empty PokéBall and an open slot in party';
  } else if (trigger === 'tower-of-darkness') {
    returnValue = 'Interact with Scroll of Darkness';
  }
  if (input.time_of_day !== '') {
    returnValue += ` in the ${input.time_of_day}`;
  }
  if (input.gender === 2) {
    returnValue += ' (Male) ';
  }
  if (input.gender === 1) {
    returnValue += ' (Female) ';
  }
  if (input.min_affection != null) {
    returnValue += ` with ${input.min_affection}+ affection`;
  }
  if (input.relative_physical_stats === 1) {
    returnValue = `Level up with Attack > Defense`;
  } else if (input.relative_physical_stats === -1) {
    returnValue = `Level up with Attack < Defense`;
  } else if (input.relative_physical_stats === 0) {
    returnValue = `Level up with Attack = Defense`;
  }
  return returnValue;
};

export const removeDashes = (name) => {
  const nameList = name.split('-');
  if (nameList.length > 1 && nameList.length < 3) {
    return nameList[1];
  } else if (nameList.length > 2) {
    return `Mega ${nameList[2]}`;
  }
  return nameList[0];
};

export const calculateCaptureRate = (captureRate) => {
  return ((captureRate / 3 / 255) * 100).toFixed(2);
};

export const calculateFriendship = (friendship) => {
  if (friendship === 0) {
    return 'Minimum';
  } else if (friendship > 0 && friendship < 50) {
    return 'Lower than Normal';
  } else if (friendship >= 50 && friendship < 90) {
    return 'Normal';
  } else if (friendship >= 90 && friendship < 140) {
    return 'Higher than Normal';
  } else if (friendship >= 140) {
    return 'High';
  }
  return 'Unknown';
};

export const moveIcons = {
  physical: {
    icon: physical,
    color: '#f44336',
  },
  special: {
    icon: special,
    color: '#2196f3',
  },
  status: {
    icon: status,
    color: '#B3B3B3',
  },
};

export const contestColors = {
  beauty: {
    color: '#FFB6C1',
  },
  cool: {
    color: '#87CEFA',
  },
  cute: {
    color: '#FFA07A',
  },
  smart: {
    color: '#90EE90',
  },
  tough: {
    color: '#C3ADFC',
  },
};

export const getContestColor = (contest) => {
  if (isNull(contest.contest_type)) {
    contest.contest_type = { name: 'No Contest Type' };
  }
  switch (contest.contest_type.name) {
    case 'beauty':
      return '#FFB6C1';
    case 'cool':
      return '#87CEFA';
    case 'cute':
      return '#FFA07A';
    case 'smart':
      return '#90EE90';
    case 'tough':
      return '#C3ADFC';
    default:
      return '#FFAC63';
  }
};

export const convertContestName = (contest) => {
  if (isNull(contest.contest_type)) {
    contest.contest_type = { name: 'No Contest Type' };
  }
  return startCase(contest.contest_type.name);
};

export const generateRandomColor = () => {
  const color =
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase();
  return pSBC(0.6, color, '#FFF');
};
