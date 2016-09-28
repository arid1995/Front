const assert = require('assert');
const hello = require('./public/libraries/textProcessing.js').hello;
const filter = require('./public/libraries/textProcessing.js').filter;
const plural = require('./public/libraries/textProcessing.js').plural;
const plur = require('./public/libraries/textProcessing.js').plur;

assert.equal(hello('Test'), 'Привет, Test');

assert.equal(plural(0), 'Здравствуй, дух');
assert.equal(plural(1), 'Рады приветствовать на нашем курсе!');
assert.equal(plural(2), 'Кликай дальше!! Еще осталось 13 раз(а)');
assert.equal(plural(13), 'Кликай дальше!! Еще осталось 2 раз(а)');
assert.equal(plural(15), '01001000 01101001 00101100 00100000 01100010 01110010 01101111');
assert.equal(plural(100), '01001000 01101001 00101100 00100000 01100010 01110010 01101111');

assert.equal(plur(0), 'раз');
assert.equal(plur(1), 'раз');
assert.equal(plur(2), 'раза');
assert.equal(plur(12), 'раз');
assert.equal(plur(101), 'раз');
assert.equal(plur(204), 'раза');
assert.equal(hello('Test'), 'Привет, Test');
assert.equal(filter('КЕК ПЕК'), '*** ***');
assert.equal(filter('КЕК КЕК'), '*** ***');
assert.equal(filter('Go KeK yourself, you kEkckin\' Kek!'),
                    'Go *** yourself, you ***ckin\' ***!');
assert.equal(filter('God I hate this Shrek movie and the fucking Dreamworks ' +
  'company! They gave birth to Kek! ШрЕк them!!!'), 'God I hate this ***** ' +
  'movie and the fucking ********** company! They gave birth to ***! **** them!!!');
assert.equal(filter('КЕК ПЕК, Shrek is a kek.'), '*** ***, ***** is a ***.');
assert.equal(filter('shrek must die cause he is a total kek!'),
                    '***** must die cause he is a total ***!');
