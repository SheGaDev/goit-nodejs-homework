/**
 *
 * @param {string} id
 * @returns {true | false}
 */
module.exports = (id) => {
  const regex = /^[a-zA-Z0-9-_]{21}$/;
  return regex.test(id);
};
