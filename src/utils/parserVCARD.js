/**
 *
 *  ML KIT GOOGLE soported labels list.
 *  When qr code is captured by the camera, display this labels ( key data ). When qr is captured by mage file, read rawValue if is Vcard and
 *  display all labels. To Work...!!!
 *
 * - Adressess
 * - Emails
 * - Person Name
 * - Organization
 * - Phones
 * - Title
 * - Urls (personal, work or social)
 *
 * **/


function parseVCardToObject(vcard) {
  let card = stripUnixChars(vcard);
  let cardLines = splitAtNewLines(card);
  let propertyLines = evalProperties(cardLines);
  let propertiesChunks = parseLinesToPropertiesChunks(propertyLines);
  let properties = parseChunksToProperties(propertiesChunks);
  return properties;
}

/*
parse string
*/

export function parseString(string, callback) {
  let json = parseVCardToObject(string);
  callback(null, json);
}

/*
parse file
*/

// function parseFile(pathToFile, callback) {
//   require("fs").readFile(pathToFile, function(err, data) {
//     if(err)
//       return callback(err);
//     let json = parseVCardToObject(data.toString());
//     callback(null, json);
//   })
// }

/*
strip unix \r chars
*/

function stripUnixChars(str) {
  return str.replace(/\r/g, "");
}

/*
split string at every new line
*/

function splitAtNewLines(str) {
  return str.split(/\n/g);
}

/*
evaluate properties
*/

function evalProperties(cardLines) {
  let numLines = cardLines.length;

  let validLines = [];
  let validLinesIndex = -1;

  let isValidProperty;
  for (let i = 0; i < numLines; i++) {
    isValidProperty = evalTextLine(cardLines[i]);

    if (isValidProperty) {
      validLinesIndex++;
      validLines[validLinesIndex] = cardLines[i];
    } else {
      validLines[validLinesIndex] += cardLines[i];
    }
  }

  return validLines;
}

/*
evaluate text line
*/

function evalTextLine(textLine) {
  let hasPropertyElement = textLine.match(/[A-Z]*:/);

  if (hasPropertyElement && hasPropertyElement.constructor.name === "Array") {
    return true;
  } else {
    return false;
  }
}

/*
parseLinesToProperties
*/

function parseLinesToPropertiesChunks(propertyLines) {
  let numLines = propertyLines.length;
  let properties = [];

  for (let i = 0; i < numLines; i++) {
    console.log("parsePropertyChunks(propertyLines[i])", parsePropertyChunks(propertyLines[i]));
    properties.push(parsePropertyChunks(propertyLines[i]));
  }

  return properties;
}

/*
parseProperty
*/

function parsePropertyChunks(propertyLine) {
  let arr = propertyLine.split(":");
  let chunks = [];
  chunks[0] = arr[0] || "";

  chunks[1] = "";
  for (let i = 1; i < arr.length; i++) {
    chunks[1] += (":" + arr[i]);
  }
  chunks[1] = chunks[1].substr(1);

  return chunks;
}

/*
parseChunksToProperties
*/

function parseChunksToProperties(propertiesChunks) {
  let numPropertiesChunks = propertiesChunks.length;
  let properties = {};
  let property;
  for (let i = 0; i < numPropertiesChunks; i++) {
    property = parsePropertyChunksToObject(propertiesChunks[i]);

    if (properties[property.name]) {
      switch (properties[property.name].constructor.name) {
        case "Object":
          //convert object to array, store new item into it
          properties[property.name] = [
            properties[property.name],
            property.value
          ];
          break;
        case "Array":
          //add new value to array
          properties[property.name].push(property.value);
          break;
      }
    } else {

      switch (property.name) {
        default:
          properties[property.name] = property.value;
          break;
        case "tel":
        case "email":
        case "impp":
        case "url":
        case "adr":
        case "x-socialprofile":
        case "x-addressbookserver-member":
        case "member":
          properties[property.name] = [property.value];
          break;
      }
    }
  }

  return properties;
}

/*
parsePropertyChunksToObject
*/

function parsePropertyChunksToObject(propertyChunks) {

  let obj = {};

  let leftPart = propertyChunks[0];
  let rightPart = propertyChunks[1];

  let leftPartPieces = leftPart.split(";");
  let numLeftPartPieces = leftPartPieces.length;

  let propTypes = [];

  for (let i = 1; i < numLeftPartPieces; i++) {
    if (leftPartPieces[i].substr(0, 5).toUpperCase() === "TYPE=") {
      propTypes.push(leftPartPieces[i].substr(5).toLowerCase());
    }
  }

  obj.name = leftPartPieces[0].replace(/(item|ITEM)[0-9]./, "").toLowerCase();

  switch (obj.name) {
    case "n":
      obj.value = parseName(rightPart);
      obj.test = "boe";
      break;
    case "adr":
      obj.value = parseAddress(rightPart, propTypes);
      break;
    case "email":
      obj.value = parseEmails(rightPart, propTypes);
      break;
    case "tel":
      obj.value = parsePhones(rightPart, propTypes);
      break;
    case "impp":
    case "url":
      obj.value = parseMVProperty(rightPart, propTypes);
      break;
    case "org":
      obj.value = parseOrganization(rightPart);
      break;
    case "photo":
      obj.value = parsePhoto(rightPart, propTypes);
      break;
    default:
      obj.value = parseMVProperty_unkow(rightPart, leftPart, propTypes);
      break;
  }

  return obj;
}

/*
parseMVProperty
*/

function parseMVProperty_unkow(mvValue, leftPart, types) {
  console.log("--------------------------  t  -------------------------------------------", types);
  console.log("-------------------------  rightpart   --------------------------------------------", mvValue);
  console.log("-------------------------  leftPart   --------------------------------------------", leftPart);
  return {
    type: types,
    value: mvValue
  };
}

/*
parseMVProperty
*/

function parseMVProperty(mvValue, types) {
  console.log("--------------------------  t  -------------------------------------------", types);
  console.log("-------------------------  v   --------------------------------------------", mvValue);
  return {
    type: types,
    value: mvValue
  };
}

/*
parsePhones
*/

function parsePhones(phoneValue, types) {
  return {
    number: phoneValue,
    type: types[0]
  };
}

/*
parseEmails
*/

function parseEmails(mvValue, types) {
  return {
    address: mvValue,
    body: "",
    subject: "",
    type: types[0]
  };
}

/*
parseAddresss
*/

function parseAddress(adrValues, types) {

  let addressValues = adrValues.split(";", 7);
  let address = {
    street: addressValues[0] + addressValues[1] + addressValues[2],
    city: addressValues[3],
    region: addressValues[4],
    zip: addressValues[5],
    country: addressValues[6]
  };
  return {
    addressLines: [`${address.street} ${address.city}, ( ${address.region} ), ${address.zip} - ${address.country}`],
    type: types[0]
  };
}

/*
parseName
*/

function parseName(nameValues) {
  nameValues = nameValues.split(";", 5);
  return {
    first: nameValues[2],//2
    formattedName: `${nameValues[3]} ${nameValues[2]} ${nameValues[1]} ${nameValues[0]}, ${nameValues[4]}`,
    last: nameValues[0],
    middle: nameValues[1],//1
    prefix: nameValues[3],//4
    pronunciation: "",
    suffix: nameValues[4]
  };
}

/*
parseOrganization
*/

function parseOrganization(orgValues) {
  orgValues = orgValues.split(";", 2);
  return {
    name: orgValues[0],
    dept: orgValues[1]
  };
}

/*
parsePhoto
*/
function parsePhoto(base64string, types) {
  return {
    type: types,
    value: base64string
  };
}


//export
// exports.parseString = parseString;
// exports.parseFile = parseFile;