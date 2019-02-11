/* ===================
 * == Configuration ==
 * ===================
 */
 
var UseJSMods = true;

var ModList = [
    "magic_regen",
    "better_controls",
    "better_saving",
    "better_gear"
    // "more_severe_death"

];



/* ============================
 * == Begin Script Execution ==
 * ============================
 */
 

if (UseJSMods){
 
    var RESIDENCE = fs.getcwd() + "\\Scripts\\";

    console.log("My CWD = ", fs.getcwd());
    
    //Search For Mods:
    Duktape.modSearch = function (id) {
        // This seems to require an absolute path. We'll need a fix to use a relative path here though.
        
        
        // console.log("");
        // console.log("******************************************************************************************");
        // console.log('ModSearch Import: ' + RESIDENCE + id+ '.js') ;
        console.log('    >> Duktape - ModSearch Import: ' + id + '.js') ;
        // console.log("******************************************************************************************");
        // console.log("");
        
        
        var res = fs.readFile(RESIDENCE + id+ '.js');   
        
        if (res == false) { console.log('Import Failed.'); }
        
        //Some error handling would be nice.
        return res.toString();
    }
    
    console.log("Initializing Common Libraries...");
    // Loading Common:
    var GlobalMem = require("./common/GlobalMem").GlobalMem;
    GlobalMem.initialize(mem, u8, u16, u32);
    
    var Link = require("./common/Link").Link;
    Link.initialize(mem, u8, u16, u32);
        
    var Game = require("./common/Game").Game;
    Game.initialize(mem, u8, u16, u32);
    
    var Input = require("./common/Input");
    // Input.Setup_AutoMC();
    // Input.MonitoredControlsArray;
    
    
    //Loading Mods:
    // console.log('Loading the Magic Regen mod...');
    // var MagicRegenMod = require('mods/magic_regen.mod');
    // var MagicRegenModHandler = new MagicRegenMod.ModMain();
    
    // console.log('Loading the Better Controls mod...');
    // var BetterControlsMod = require('mods/better_controls.mod');
    // var BetterControlsModHandler = new BetterControlsMod.ModMain();
    
    // console.log('Loading the Better Saving mod...');
    // var BetterSavingMod = require('mods/better_saving.mod');
    // var BetterSavingModHandler = new BetterSavingMod.ModMain();
    
    // console.log('Loading the Better Gear mod...');
    // var BetterWalletsMod = require('mods/better_gear.mod');
    // var BetterWalletsModHandler = new BetterWalletsMod.ModMain();

    // MagicRegenModHandler.Init(mem, u8, u16, u32);
    // BetterControlsModHandler.Init(mem, u8, u16, u32);
    // BetterSavingModHandler.Init(mem, u8, u16, u32);
    // BetterWalletsModHandler.Init(mem, u8, u16, u32);

    
    console.log("Initializing Mods...");
    var NumberOfMods = ModList.length;
    var ModLibs = [];
    var ModHandlers = [];
    
    // Importing Mods:
    for (var i = 0; i < NumberOfMods; i++) {
        var NewMod = require("mods/" + ModList[i] + ".mod");
        var NewModHandler = new NewMod.ModMain();
        
        ModLibs.push(NewMod);
        ModHandlers.push(NewModHandler);
        
        
    }    
    
    // Initializing Mods:
    for (var i = 0; i < NumberOfMods; i++) {
        ModHandlers[i].Init(mem, u8, u16, u32);
    }   

    console.log('Begin Temple Execution Cycle!');


    
}

events.ondraw(function() {
    if (UseJSMods){
        if (Input.MonitoredControlsArray.length > 0) {
            for (var i = 0; i < Input.MonitoredControlsArray.length; i++) {
                Input.MonitoredControlsArray[i].Update();
            }
        }
        
        
        for (var i = 0; i < NumberOfMods; i++) {
            ModHandlers[i].Run(mem, u8, u16, u32);
        } 
        
        // MagicRegenModHandler.Run();
        // BetterControlsModHandler.Run();
        // BetterSavingModHandler.Run();
        // BetterWalletsModHandler.Run();
    }

});
