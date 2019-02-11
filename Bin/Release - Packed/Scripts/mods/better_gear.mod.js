var Link = require("../common/Link").Link;
var GameMod = require("../common/Game");
var Game = GameMod.Game;
var Wallets = GameMod.Wallet;

var ModMain = (function () {

    function ModMain() {
        // console.log('Loading the Better Gear mod...');
    }

    ModMain.prototype.Init = function (mem, u8, u16, u32) {
        this.UseMod = true;
 
        // this.bigBombBagTextAddr = 0x00A3FFD4;
        
        // this.DoOnce = true;
        
    };
    

    ModMain.prototype.Run = function (mem, u8, u16, u32) {
        // if (this.DoOnce) {
            // system.setRomAddress8(this.bigBombBagTextAddr, 0x39);
            
            // this.DoOnce = false;
        // }
        // console.log(system.getRomAddress8(this.bigBombBagTextAddr));

        
        if (this.UseMod){
            Game.Wallets.child.size = 200;
            Game.Wallets.adult.size = 500;
            Game.Wallets.giant.size = 999;
            
            Game.Bags.Bombs.size_small = 30;
            Game.Bags.Bombs.size_med = 60;
            Game.Bags.Bombs.size_large = 99;
            
            // Game.Bags.Quiver.size_small = 30;
            Game.Bags.Quiver.size_med = 60;
            Game.Bags.Quiver.size_large = 99;
            
            
            
            // Forms Can Use:
            Link.DekuUseTable.DekuSticks = 1;
            Link.DekuUseTable.MagicBeans = 1;
            // Link.DekuUseTable.Hookshot = 1;
            Link.DekuUseTable.GreatFairySword = 1;
            
            Link.GoronUseTable.Bombs = 1;
            Link.GoronUseTable.Bombchus = 1;
            Link.GoronUseTable.DekuNuts = 1;
            Link.GoronUseTable.MagicBeans = 1;
            
            Link.ZoraUseTable.Bombs = 1;
            Link.ZoraUseTable.Bombchus = 1;
            Link.ZoraUseTable.DekuSticks = 1;
            Link.ZoraUseTable.DekuNuts = 1;
            Link.ZoraUseTable.MagicBeans = 1;
            
            //Use C-items Anywhere:
            // GlobalMem.mem.u16[0x801EAA69] = 0;
            // GlobalMem.mem.u16[0x801EAA6B] = 0;
                	
                            
            
        }

        
    };
    return ModMain;
})();
exports.ModMain = ModMain;
