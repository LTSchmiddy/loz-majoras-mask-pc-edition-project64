/* ===================
 * == Configuration ==
 * ===================
 */
 
var UseJSMods = true;

 



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
        console.log('ModSearch Import: ' + RESIDENCE + id+ '.js') ;
        var res = fs.readFile(RESIDENCE + id+ '.js');   
        
        if (res == false) { console.log('Import Failed.'); }
        
        //Some error handling would be nice.
        return res.toString();
    }
    
    //Loading Mods:
    console.log('Loading the Magic Regen mod...');
    var MagicRegenMod = require('mods/magic_regen.mod');
    var MagicRegenModHandler = new MagicRegenMod.ModMain();

    MagicRegenModHandler.Init(mem, u8, u16, u32);


    console.log('Begin Temple Execution Cycle!');


    events.ondraw(function()
    {
        MagicRegenModHandler.Run();
        // DisplayMod.Run();
        
        
        // console.log("tick");
    });
}
