var userName; // number, boolean
var userAge = 38;
// ...
userName = 'Max';
// userAge = '34';
function add(a, b) {
    if (b === void 0) { b = 5; }
    return a + b;
}
add(10);
// add('10');
add(10, 6);
// add(10, '6');
