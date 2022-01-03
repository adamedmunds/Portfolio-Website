const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@Components": "src/Components",
    "@Utils": "src/Utils",
  })(config);

  return config;
};
