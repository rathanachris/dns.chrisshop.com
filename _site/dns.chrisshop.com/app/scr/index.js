const { DefaultDeserializer } = require("v8");

function stringToBytes(str) {
      return new TextEncoder().encode(str);
}
      const name = "chris.rathana";
      const bytes = stringToBytes(name);

    console.log(bytes);{
}