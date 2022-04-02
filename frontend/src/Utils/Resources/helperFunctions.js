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
    default:
      return 'Unknown';
  }
};

export const convertName = (item) => {
  switch (item) {
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
    default:
      return 'Unknown';
  }
};

export const getEvolutionTrigger = (input) => {
  console.log(input);
  if (input === undefined) return;
  const trigger = input.trigger.name;
  var returnValue;

  if (trigger === 'use-item') {
    returnValue = `Use ${convertName(input.item.name)}`;
  } else if (trigger === 'trade') {
    const needsItem = input.held_item === null;
    returnValue = `Trade ${
      !needsItem ? `with ${convertName(input.held_item.name)}` : ''
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
      returnValue = `Level up with ${convertName(input.held_item.name)}`;
    }
  } else if (trigger === 'three-critical-hits') {
    returnValue = `Three critical hits in one battle`;
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
  return returnValue;
};
