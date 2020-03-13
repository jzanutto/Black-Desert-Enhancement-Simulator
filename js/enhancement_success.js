var successSound = new Audio("wav/success.wav");
successSound.volume = 0.2;


function playEnhancementSuccessSound() {
  successSound.currentTime = 0;
  successSound.play();
}

function enhancementSuccess(obj, weaponId, slotNum, existingDiv) {
  playEnhancementSuccessSound();
  obj[weaponId].enhanceRank++;
  var itemType = getItemType(obj[weaponId].itemClass);

  if (obj[weaponId].enhanceRank === 15) {
    obj[weaponId].blackStoneWeaponTotalSuccess = obj[weaponId].enhancementSuccessCount + 1;
    obj[weaponId].blackStoneWeaponTotalFailure = obj[weaponId].enhancementFailCount;
    obj[weaponId].enhancementSuccessCount = 0;
    obj[weaponId].enhancementFailCount = 0;
  } else {
    obj[weaponId].enhancementSuccessCount++;
    obj[weaponId].totalEnhancementAttempts++;
  }

  if (obj[weaponId].enhanceRank > 7 && itemType === "weapon") {
    failStackCount = 0;
  }
  if (itemType === "accessory") {
    failStackCount = 0;
  }
  if (obj[weaponId].enhanceRank > 5 && itemType === "armor") {
    failStackCount = 0;
  }

  if (obj[weaponId].enhanceRank === 17) {
    obj[weaponId].duoSuccs++;
  }

  if (obj[weaponId].enhanceRank === 18) {
    obj[weaponId].triSuccs++;
  }
  if (obj[weaponId].enhanceRank === 19) {
    obj[weaponId].tetSuccs++;
  }
  if (obj[weaponId].enhanceRank === 20) {
    obj[weaponId].penSuccs++;
  }

  if(existingDiv.attr('id') === "enhancement_rank")
  {
    existingDiv.remove();
  }

  //checks if there is an existing item in enhancement window
  if ($('#temp_enhancement_rank').length)
  {
    $('#temp_enhancement_rank').remove();
  }

  prependEnhancementRank(obj, slotNum, weaponId);

  $('#counter').text('+' + failStackCount);
  $('#character_class_' + characterSlot).parent().children('div').text(failStackCount);
  $('#percent_odds').text((getFailstackPercentage(obj[weaponId].enhanceRank, itemType) * 100).toFixed(2) + "%");
}
