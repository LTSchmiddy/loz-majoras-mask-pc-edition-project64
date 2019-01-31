var Link = require("../common/Link").Link;

var ModMain = (function () {
    // Set initial variables and values here:
    function ModMain() {
        this.MagicRegenTickMax = 80;
        this.MagicRegenTick = 80;
        
        this.MagicRegenDelayMax = 900;
        this.MagicRegenDelay = 900;
        
        this.lastMagic = 0;
    }
    // Runs once when emulation is started:
    ModMain.prototype.Init = function (mem, u8, u16, u32) {
        
        
        Link.initialize(mem, u8, u16, u32);
        this.lastMagic = Link.magic;
        mem.bindvar(this, 0x803FDA3D , 'pauseMenuState', u8); 
    };
    
    /* The ModMain.Run() function defines the main function of a Temple-based mod.
    It is executed continuously during gameplay. */
    ModMain.prototype.Run = function () {

        if (this.pauseMenuState != 0) {
            return;
        }
        
        if (system.getinput(1, 0) {
            system.pressinput(1, 4, true);
            screen.print(0, 0, "hello");
        } else {
            system.pressinput(1, 4, false);
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
        
        console.log("MagicRegenDelay: ", this.MagicRegenDelay);
        
        // Link.rupees = 7;
        
    };
    return ModMain;
})();
exports.ModMain = ModMain;
