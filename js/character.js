var characterSlot = 0;
var failStackInstance = [];


$("img[id^='character_class_']").on("click", function(img) {
  // save the old failstack

  failStackInstance[characterSlot] = failStackCount;
  var currentChar = img.currentTarget.id.split("_")[2];
  if (failStackInstance[currentChar] == null) {
    failStackInstance[currentChar] = 0;
  }

  $("#character_class_" + characterSlot).parent().children('div').text(failStackInstance[characterSlot]);
  $("#character_class_" + characterSlot).parent().css("border", "0px black");

  $(this).parent().css("border", "1px solid gray" );

  characterSlot = currentChar;
  failStackCount = failStackInstance[characterSlot];
  $('#counter').text('+' + failStackCount);
  setOdds(selectedItemSlot, obj);
});

$("#manual_fs").on("submit", function() {
  var manualStack = $("#manual_value")[0].value;
  failStackCount = parseInt(manualStack);
  $('#counter').text('+' + failStackCount);

  $("#character_class_" + characterSlot).parent().children('div').text(failStackCount);
  setOdds(selectedItemSlot, obj);
  return false;
});

function setOdds(selectedItemSlot, obj) {
  if (selectedItemSlot >= 0) {
    var itemType = getItemType(obj[selectedItemSlot].itemClass);
    $('#percent_odds').text((getFailstackPercentage(obj[selectedItemSlot].enhanceRank, itemType) * 100).toFixed(2) + "%");
  }
}