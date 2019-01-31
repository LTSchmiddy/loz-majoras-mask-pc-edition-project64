var ButtonMap_1 = require("./ButtonMap");
(function (Players) {
    Players[Players["ONE"] = 1] = "ONE";
    Players[Players["TWO"] = 2] = "TWO";
    Players[Players["THREE"] = 3] = "THREE";
    Players[Players["FOUR"] = 4] = "FOUR";
})(exports.Players || (exports.Players = {}));
var Players = exports.Players;
var PlayerInput = (function () {
    function PlayerInput(_number, mem, u8, u16, u32) {
        this.number = _number;
        switch (this.number) {
            case 1:
                mem.bindvar(this, 0x801C84B4, 'input_player_A', u16);
                mem.bindvar(this, 0x801C84B5, 'input_player_B', u16);
                mem.bindvar(this, 0x801C84B6, 'input_player_analog_x', u8);
                mem.bindvar(this, 0x801C84B7, 'input_player_analog_y', u8);
                break;
            case 2:
                break;
            case 3:
                mem.bindvar(this, 0x801C84E4, 'input_player_A', u16);
                mem.bindvar(this, 0x801C84E5, 'input_player_B', u16);
                mem.bindvar(this, 0x801C84E6, 'input_player_analog_x', u8);
                mem.bindvar(this, 0x801C84E7, 'input_player_analog_y', u8);
                break;
            case 4:
                break;
            default:
                break;
        }
    }
    PlayerInput.prototype.isPressingButton = function (button) {
        if (button.type == ButtonMap_1.ButtonType.A) {
            return this.input_player_A == button.value;
        }
        else if (button.type == ButtonMap_1.ButtonType.B) {
            return this.input_player_B == button.value;
        }
    };
    PlayerInput.prototype.getAnalogStickX = function () {
        return this.input_player_analog_x;
    };
    PlayerInput.prototype.getAnalogStickY = function () {
        return this.input_player_analog_y;
    };
    PlayerInput.prototype.setZero = function () {
        this.input_player_A = 0;
        this.input_player_B = 0;
    };
    return PlayerInput;
})();
exports.PlayerInput = PlayerInput;
