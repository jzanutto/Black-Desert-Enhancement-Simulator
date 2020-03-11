//base enhancement rates
var baseRateWeapon = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0.7,
  0.2041,
  0.1429,
  0.10,
  0.0667,
  0.04,
  0.025,
  0.02,
  0.1176,
  0.0769,
  0.0625,
  0.02,
  0.003
];

//enhancement rates for each rank
var failStackRateWeapon = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0.0204,
  0.0142,
  0.01,
  0.0067,
  0.004,
  0.0025,
  0.002,
  0.0117,
  0.0077,
  0.0063,
  0.002,
  0.0003
];

var failStackRateSCWeapon = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0.014,
  0.0041,
  0.0029,
  0.002,
  0.0013,
  0.004,
  0.0025,
  0.002,
  0.0023,
  0.0016,
  0.0012,
  0.002,
  0.0003
];

var softCapFailStackWeapon  = [
  Infinity,
  Infinity,
  Infinity,
  Infinity,
  Infinity,
  Infinity,
  Infinity,
  0,
  25,
  43,
  60,
  95,
  Infinity,
  Infinity,
  Infinity,
  52,
  82,
  102,
  Infinity,
  Infinity
];

var enhancementSoftCapNonAcc = 0.7;

var enhancementHardcap = 0.9;

var baseRateAcc = [
  0.25,
  0.1,
  0.075,
  0.025,
  0.005
];

// var successSCAcc = [
//   0.7,
//   0.5,
//   0.405,
//   0.3,
//   0.9
// ];

var softCapFailStackAcc = [
  18,
  40,
  44,
  110,
  Infinity
];

var failStackRateAcc = [
  0.025,
  0.01,
  0.0075,
  0.0025,
  0.0005
];

var failStackRateSCAcc = [
  0.005,
  0.002,
  0.0015,
  0.0005,
  0.0005
];



function getFailstackPercentage(enhanceRank, itemType) {
  var successChance = 0;
  if (itemType === "weapon") {
    if (failStackCount > softCapFailStackWeapon[enhanceRank]) {
      var postSCFailStack = failStackCount - softCapFailStackWeapon[enhanceRank];
      successChance = baseRateWeapon[enhanceRank] + (failStackRateWeapon[enhanceRank] * softCapFailStackWeapon[enhanceRank]) + (failStackRateSCWeapon[enhanceRank] * postSCFailStack);
    } else {
      successChance = baseRateWeapon[enhanceRank] + (failStackRateWeapon[enhanceRank] * failStackCount);
    }
    if (enhanceRank < 7) {
      return 1;
    }
     else if (successChance > enhancementHardcap) {
      return enhancementHardcap;
    }
  } else if (itemType === "armor") {

  } else {
    // acc
    if (failStackCount > softCapFailStackAcc[enhanceRank]) {
      var postSCFailStack = failStackCount - softCapFailStackAcc[enhanceRank];
      successChance = baseRateAcc[enhanceRank] + (failStackRateAcc[enhanceRank] * softCapFailStackAcc[enhanceRank]) + (failStackRateSCAcc[enhanceRank] * postSCFailStack);
    } else {
      successChance = baseRateAcc[enhanceRank] + (failStackRateAcc[enhanceRank] * failStackCount);
    }
    if (successChance > enhancementHardcap) {
      return enhancementHardcap;
    }
  }
  return successChance;
}

function getItemType(localItemClass) {
  var itemType = "weapon";
  if (localItemClass === "dandelion" || localItemClass === "kzarka" || localItemClass === "liverto") {
    itemType = "weapon";
  } else if (localItemClass === "top_tier") {
    itemType = "accessory";
  } else {
    itemType = "armor";
  }
  return itemType;
}

function enhanceItem(obj, weaponId, slotNum, randomNum, existingDiv) {
  var itemType = getItemType(obj[weaponId].itemClass);

  if (obj[weaponId].enhanceRank >= 20 || (itemType === "accessory" && obj[weaponId].enhanceRank >= 5))
  {
    return;
  }
  enhanceRank = obj[weaponId].enhanceRank;


  var failStackPercentage = getFailstackPercentage(enhanceRank, itemType);
  var success = randomNum < failStackPercentage;
  if (itemType === "weapon") {
    if (obj[weaponId].enhanceRank === 15) {
      if ($('#black_stone_weapon_temp').length) {
        $('#black_stone_weapon_temp').attr('src', "img/black_stone/concentrated_magical_black_stone_weapon.png");
      }
    }
    if (success) {
      enhancementSuccess(obj, weaponId, slotNum, existingDiv);
    } else {
      enhancementFailure(obj, weaponId, slotNum, existingDiv);
    }

  } else if (itemType === "armor") {

  } else {
    success ?
      enhancementSuccess(obj, weaponId, slotNum, existingDiv) :
      enhancementFailure(obj, weaponId, slotNum, existingDiv);

  }
}
