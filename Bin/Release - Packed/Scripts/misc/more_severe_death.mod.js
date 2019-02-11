var Link = require("../common/Link").Link;
var Game = require("../common/Game").Game;

var ModMain = (function () {
    // Set initial variables and values here:
    function ModMain() {

    }
    // Runs once when emulation is started:
    ModMain.prototype.Init = function (mem, u8, u16, u32) {
        
        this.iterVal = -1;
    };
    
    /* The ModMain.Run() function defines the main function of a Temple-based mod.
    It is executed continuously during gameplay. */
    ModMain.prototype.Run = function (mem, u8, u16, u32) {
        
        if (Link.health == 0) {
            // system.hardreset();
            this.iterVal = 0;
            return;

        }
        
        this.deathIterator();
       
        
    };
    
    ModMain.prototype.deathIterator = function () { 
    
    
        // console.log(this.iterVal);
        if (this.iterVal < 0) {
            return;
            
        }
        // screen.print(0, 0, this.SaveText);
        
        switch (this.iterVal) {
            case 0:

                // system.pressinput(1, ButtonMap.B_BUTTON.id, true);

                break;
            
            case 180:
                system.hardreset();
                this.iterVal = -1;
                break;
                           
            default:
                break;
            
        }
        
        if (this.iterVal >= 0) {
            this.iterVal += 1;
            
        }
        

    };
    
    
    return ModMain;
})();
exports.ModMain = ModMain;
