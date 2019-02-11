var Input = require("../common/Input");

var Link = require("../common/Link").Link;
var Game = require("../common/Game").Game;
var ButtonMap = require("../common/ButtonMap").ButtonMap;
var ItemIndex = require("../common/ItemIndex").ItemIndex;
var GlobalMem = require("../common/GlobalMem").GlobalMem;

var ModMain = (function () {

    function ModMain() {
        // console.log('Loading the Better Saving mod...');
        //Do = 
        //Change to = 20759
    }

    ModMain.prototype.Init = function (mem, u8, u16, u32) {
        this.IsActive = true;
        
        this.PauseSave = new Input.MonitoredControl(1, ButtonMap.U_DPAD.id);
        this.PauseLoad = new Input.MonitoredControl(1, ButtonMap.D_DPAD.id);

        this.iterVal = -1;
        
        this.SaveText = "Game Saved";
    };
    

    ModMain.prototype.Run = function (mem, u8, u16, u32)  {
        if (!this.IsActive) {
            return;
        }
        // GlobalMem.mem.u16[0x803FD72C] = 0x28;
        this.pauseSaveIterator();
        
        
        if (Game.pauseMenuState == 0) {
            return;
        }
        
        // system.callRomFunc(0x803E6B20);
        // system.callRomFunc(0x803E6B20);
        
        if (this.iterVal >= 0) {
            return;
            
        }
        
        if (this.PauseSave.KeyDown()) {
            system.savestate();
            this.SaveText = "Game Saved";
            
            // alert('Game Saved.') // Blocks the emulation thread
            // this.iterVal = 0;
        }
        
        else if (this.PauseLoad.KeyDown()) {
            Input.QuickIteratorRunning = false;
            system.loadstate();
            this.SaveText = "Game Loaded";
            
            // alert('Game Saved.') // Blocks the emulation thread
            this.iterVal = 0;
        }
         
        


    };
    
    ModMain.prototype.pauseSaveIterator = function () { 
    
    
        // console.log(this.iterVal);
        if (this.iterVal < 0) {
            return;
            
        }
        screen.print(0, 0, this.SaveText);
        
        switch (this.iterVal) {
            case 0:

                // system.pressinput(1, ButtonMap.B_BUTTON.id, true);

                break;
            
            case 30:

                break;
            
            
            
            case 35:
                // system.pressinput(1, ButtonMap.B_BUTTON.id, false);
                break;
            
            
            case 90:
                Input.QuickIteratorRunning = false;
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
