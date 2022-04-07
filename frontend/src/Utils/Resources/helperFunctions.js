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

export const genTranslator = (gen) => {
  switch (gen) {
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
    case 'x':
      return 'Ten';
    default:
      return 'Unknown';
  }
};

export const convertName = (translation) => {
  switch (translation) {
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
