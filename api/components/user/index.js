// Se encargará de exportar todos nuestros controladores

const store = require('../../../store/dummy');
const controller = require('./controller');

module.exports = controller(store); // inject store into controller