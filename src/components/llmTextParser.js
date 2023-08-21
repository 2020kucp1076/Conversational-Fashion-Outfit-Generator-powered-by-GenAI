export function extractText(inputText) {
  var splitTextByNumber = inputText.split('/');
  const outfits = [];
  for (let index = 1; index < splitTextByNumber.length; index++) {
    var slicedTextByFeatures = splitTextByNumber[index].split('*');
    if(slicedTextByFeatures.length == 4)
      outfits.push([slicedTextByFeatures[0], slicedTextByFeatures[1], slicedTextByFeatures[2], slicedTextByFeatures[3]]);
  }
  return outfits;
}

