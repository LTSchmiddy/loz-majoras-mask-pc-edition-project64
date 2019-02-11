var ButtonMap = (function () {
    function ButtonMap(_id) {
        this.id = _id;
    }

    ButtonMap.R_DPAD = new ButtonMap(0);
    ButtonMap.L_DPAD = new ButtonMap(1);
    ButtonMap.D_DPAD = new ButtonMap(2);
    ButtonMap.U_DPAD = new ButtonMap(3);
    ButtonMap.START_BUTTON = new ButtonMap(4);
    ButtonMap.Z_TRIG = new ButtonMap(5);
    ButtonMap.B_BUTTON = new ButtonMap(6);
    ButtonMap.A_BUTTON = new ButtonMap(7);

    ButtonMap.R_CBUTTON = new ButtonMap(8);
    ButtonMap.L_CBUTTON = new ButtonMap(9);
    ButtonMap.D_CBUTTON = new ButtonMap(10);
    ButtonMap.U_CBUTTON = new ButtonMap(11);
    ButtonMap.R_TRIG = new ButtonMap(12);
    ButtonMap.L_TRIG = new ButtonMap(13);
    ButtonMap.Reserved1 = new ButtonMap(14);
    ButtonMap.Reserved2 = new ButtonMap(15);
        

    return ButtonMap;
})();
exports.ButtonMap = ButtonMap;
