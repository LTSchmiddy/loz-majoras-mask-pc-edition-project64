(function (ButtonType) {
    ButtonType[ButtonType["A"] = 1] = "A";
    ButtonType[ButtonType["B"] = 2] = "B";
})(exports.ButtonType || (exports.ButtonType = {}));
var ButtonType = exports.ButtonType;
var ButtonMap = (function () {
    function ButtonMap(_value, _type) {
        this.value = _value;
        this.type = _type;
    }
    ButtonMap.C_UP = new ButtonMap(8, 1);
    ButtonMap.C_RIGHT_UP = new ButtonMap(9, 1);
    ButtonMap.C_RIGHT = new ButtonMap(1, 1);
    ButtonMap.C_RIGHT_DOWN = new ButtonMap(5, 1);
    ButtonMap.C_DOWN = new ButtonMap(4, 1);
    ButtonMap.C_LEFT_DOWN = new ButtonMap(6, 1);
    ButtonMap.C_LEFT = new ButtonMap(2, 1);
    ButtonMap.C_LEFT_UP = new ButtonMap(10, 1);
    ButtonMap.A = new ButtonMap(4000, 1);
    ButtonMap.B = new ButtonMap(8000, 1);
    ButtonMap.Z = new ButtonMap(2000, 1);
    ButtonMap.R = new ButtonMap(10, 2);
    ButtonMap.L = new ButtonMap(20, 2);
    ButtonMap.START = new ButtonMap(100, 1);
    ButtonMap.D_RIGHT = new ButtonMap(100, 2);
    ButtonMap.D_UP = new ButtonMap(800, 2);
    ButtonMap.D_LEFT = new ButtonMap(200, 2);
    ButtonMap.D_DOWN = new ButtonMap(400, 2);
    return ButtonMap;
})();
exports.ButtonMap = ButtonMap;
