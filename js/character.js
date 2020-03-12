$("#back_arrow").hide();
var characterSlot = 1;
var maxCharacterSlots = 19;
var failStackInstance = [];


$("#back_arrow").on("click", function(){
  //checks if there is an existing item in enhancement window
  failStackInstance[characterSlot] = failStackCount;
  characterSlot--;
  $(this).parent().children('p').text('Character ' + characterSlot);

  if (characterSlot <= maxCharacterSlots && characterSlot != 1)
  {
    $("#forward_arrow").show();
  }

  if (characterSlot === 1)
  {
    $("#back_arrow").hide();
  }

  failStackCount = failStackInstance[characterSlot];
  $('#counter').text('+' + failStackCount);
  setOdds(selectedItemSlot, obj);
});

$("#forward_arrow").on("click", function(){
  failStackInstance[characterSlot] = failStackCount;
  characterSlot++;
  $("#back_arrow").show();
  $(this).parent().children('p').text('Character ' + characterSlot);

  if (characterSlot <= maxCharacterSlots && characterSlot != 1)
  {
    $("#forward_arrow").show();
  }

  if (characterSlot === maxCharacterSlots)
  {
    $("#forward_arrow").hide();
  }

  //save current inv count set next one to 0
  if (failStackInstance[characterSlot] === undefined)
  {
    failStackInstance[characterSlot] = failStackCount;
    failStackCount = 0;
  }
  else
  {
    failStackCount = failStackInstance[characterSlot];
  }
  $('#counter').text('+' + failStackCount);
  setOdds(selectedItemSlot, obj);
});

$("#manual_fs").on("submit", function() {
  var manualStack = $("#manual_value")[0].value;
  failStackCount = parseInt(manualStack);
  $('#counter').text('+' + failStackCount);
  setOdds(selectedItemSlot, obj);
  return false;
});

function setOdds(selectedItemSlot, obj) {
  if (selectedItemSlot >= 0) {
    var itemType = getItemType(obj[selectedItemSlot].itemClass);
    $('#percent_odds').text((getFailstackPercentage(obj[selectedItemSlot].enhanceRank, itemType) * 100).toFixed(2) + "%");
  }
}