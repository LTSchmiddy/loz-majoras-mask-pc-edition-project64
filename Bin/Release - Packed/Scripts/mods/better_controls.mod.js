var Input = require("../common/Input");

var Link = require("../common/Link").Link;
var Game = require("../common/Game").Game;
var ButtonMap = require("../common/ButtonMap").ButtonMap;
var ItemIndex = require("../common/ItemIndex").ItemIndex;
// var GlobalMem = require("../common/GlobalMem").GlobalMem;

var ModMain = (function () {
    // Set initial variables and values here:
    function ModMain() {
        // console.log('Loading the Better Controls mod...');
        MenuInputsController = 4;
        
    }
    // Runs once when emulation is started:
    ModMain.prototype.Init = function (mem, u8, u16, u32) {
                
        
        this.quickOcarina = new Input.QuickItem(ItemIndex.Ocarina, 1, ButtonMap.U_DPAD.id);
        this.quickDeku = new Input.QuickItem(ItemIndex.DekuMask, 1, ButtonMap.L_DPAD.id);
        this.quickGoron = new Input.QuickItem(ItemIndex.GoronMask, 1, ButtonMap.D_DPAD.id);
        this.quickZora = new Input.QuickItem(ItemIndex.ZoraMask, 1, ButtonMap.R_DPAD.id);
        
        // this.MenuA = Input.GetMC(2, 0);
        this.MenuR = new Input.MonitoredKey(0x27);
        this.MenuL = new Input.MonitoredKey(0x25);
        this.MenuU = new Input.MonitoredKey(0x26);
        this.MenuD = new Input.MonitoredKey(0x28);
        this.MenuA = new Input.MonitoredKey(0x0D);
        this.MenuB = new Input.MonitoredKey(0x08);
        // Input.MonitoredControlsArray.push(this.MenuA);
        
        this.quitCounter = 0;
        this.quitCounterMax = 300;

    };
    
    /* The ModMain.Run() function defines the main function of a Temple-based mod.
    It is executed continuously during gameplay. */
    ModMain.prototype.Run = function (mem, u8, u16, u32)  {


        // if (system.getinput(1, ButtonMap.START_BUTTON.id)) {
        // if (true) {

            // this.quitCounter++;
            // console.log(this.quitCounter);
            // if(this.quitCounter >= this.quitCounterMax) {
                // system.exitapp();
            // }
        // } else {
            // this.quitCounter = 0;
        // }
            
            
        
        
        // console.log(this.MenuA.Pressed());
        
        if (this.ShouldUseMenu()) {
            this.DoMenuInputs_Menu();
        } else {
            this.DoMenuInputs_Game();
            
            this.quickOcarina.Update();
            this.quickDeku.Update();
            this.quickGoron.Update();
            this.quickZora.Update();
            
        }
        
        
        if (Link.pauseMenuState != 0) {
            return;
        }
        


    };
    
    
    ModMain.prototype.ShouldUseMenu = function ()  { 
        if (GlobalMem.currentSaveFile == 0xff){ 
            return true
        }
    
        if (Link.health == 0 || Link.max_health == 0) {
            return true;
        }
        

        
        if (Game.pauseMenuState != 0) {
            // console.log("pause menu open");
            return true
        }
        
        return false;
        
    };
    
    
    ModMain.prototype.DoMenuInputs_Menu = function ()  { 
    
        // console.log(system.getkey(0x27));
        //A button
        if (this.MenuA.KeyDown()) {
            system.pressinput(1, ButtonMap.A_BUTTON.id, true);
            // console.log("pressed A");
        }
        
        else if (this.MenuA.KeyUp()) {
            system.pressinput(1, ButtonMap.A_BUTTON.id, false);
        }
        
        //B button
        if (this.MenuB.KeyDown()) {
            system.pressinput(1, ButtonMap.B_BUTTON.id, true);
        }
        
        else if (this.MenuB.KeyUp()) {
            system.pressinput(1, ButtonMap.B_BUTTON.id, false);
        }
        
        //Down
        if (this.MenuD.KeyDown()) {
            system.pressJoy1Y(-1);
        }
        
        else if (this.MenuD.KeyUp()) {
            system.pressJoy1Y(0);
        }
        
        //Down
        if (this.MenuU.KeyDown()) {
            system.pressJoy1Y(1);
        }
        
        else if (this.MenuU.KeyUp()) {
            system.pressJoy1Y(0);
        }
        
        //Left
        if (this.MenuL.KeyDown()) {
            system.pressJoy1X(-1);
        }
        
        else if (this.MenuL.KeyUp()) {
            system.pressJoy1X(0);
        }
        
        //Right
        if (this.MenuR.KeyDown()) {
            system.pressJoy1X(1);
        }
        
        else if (this.MenuR.KeyUp()) {
            system.pressJoy1X(0);
        }
        
        
    };
    
    
    ModMain.prototype.DoMenuInputs_Game = function ()  { 
    
        // console.log(system.getkey(0x27));
        //A button
        if (this.MenuA.KeyDown()) {
            // system.pressinput(1, ButtonMap.A_BUTTON.id, true);
            // console.log("pressed A");
            console.log(Game.GetDialogPane());
        }
        
        else if (this.MenuA.KeyUp()) {
            system.pressinput(1, ButtonMap.A_BUTTON.id, false);
        }
        
        //B button
        if (this.MenuB.KeyDown()) {
            // system.pressinput(1, ButtonMap.B_BUTTON.id, true);
        }
        
        else if (this.MenuB.KeyUp()) {
            system.pressinput(1, ButtonMap.B_BUTTON.id, false);
        }
        
        //Down
        if (this.MenuD.KeyDown()) {
            system.pressinput(1, ButtonMap.D_CBUTTON.id, true);
        }
        
        else if (this.MenuD.KeyUp()) {
            system.pressinput(1, ButtonMap.D_CBUTTON.id, false);
        }
        
        //Up
        if (this.MenuU.KeyDown()) {
            system.pressinput(1, ButtonMap.U_CBUTTON.id, true);
        }
        
        else if (this.MenuU.KeyUp()) {
            system.pressinput(1, ButtonMap.U_CBUTTON.id, false);
        }
        
        //Left
        if (this.MenuL.KeyDown()) {
            system.pressinput(1, ButtonMap.L_CBUTTON.id, true);
        }
        
        else if (this.MenuL.KeyUp()) {
            system.pressinput(1, ButtonMap.L_CBUTTON.id, false);
        }
        
        //Right
        if (this.MenuR.KeyDown()) {
            system.pressinput(1, ButtonMap.R_CBUTTON.id, true);
        }
        
        else if (this.MenuR.KeyUp()) {
            system.pressinput(1, ButtonMap.R_CBUTTON.id, false);
        }
        
        
    };
    
    return ModMain;
})();
exports.ModMain = ModMain;
