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
    default:
      console.log(translation);
      return 'Unknown';
  }
};

export const getEvolutionTrigger = (input) => {
  if (input === undefined) return;
  const trigger = input.trigger.name;
  console.log(input);
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
  console.log(nameList);
  if (nameList.length > 1 && nameList.length < 3) {
    return nameList[1];
  } else if (nameList.length > 2) {
    return `Mega ${nameList[2]}`;
  }
  return nameList[0];
};
