var Link = require("../common/Link").Link;
var Game = require("../common/Game").Game;

var ModMain = (function () {
    // Set initial variables and values here:
    function ModMain() {
        // console.log('Loading the Magic Regen mod...');
        this.MagicRegenTickMax = 120;
        this.MagicRegenTick = 120;
        
        this.MagicRegenDelayMax = 1200;
        this.MagicRegenDelay = 1200;
        
        this.lastMagic = 0;
    }
    // Runs once when emulation is started:
    ModMain.prototype.Init = function (mem, u8, u16, u32) {
        
        Link.rupees = 150;
        // Link.initialize(mem, u8, u16, u32);
        this.lastMagic = Link.magic;
        // mem.bindvar(this, 0x803FDA3D , 'pauseMenuState', u8); 
    };
    
    /* The ModMain.Run() function defines the main function of a Temple-based mod.
    It is executed continuously during gameplay. */
    ModMain.prototype.Run = function (mem, u8, u16, u32) {

        if (Game.pauseMenuState != 0) {
            // Link.rupees = 100;
            return;

        }
        
        
       
        if (Link.magic < this.lastMagic) { 
            this.MagicRegenDelay = this.MagicRegenDelayMax;
        }
        
        if (this.MagicRegenDelay <= 0) {
            
            if (this.MagicRegenTick <= 0) {
                this.MagicRegenTick = this.MagicRegenTickMax;
                
                
                if (Link.magic < Link.get_max_magic()){
                    Link.magic = Link.magic + 1;
                }
            } else {
                this.MagicRegenTick--;
            }
            
        } else {
            this.MagicRegenDelay--;
        }
        
        this.lastMagic = Link.magic;
        
        // console.log("MagicRegenDelay: ", this.MagicRegenDelay);
        
        // Link.rupees = 7;
        
    };
    return ModMain;
})();
exports.ModMain = ModMain;
