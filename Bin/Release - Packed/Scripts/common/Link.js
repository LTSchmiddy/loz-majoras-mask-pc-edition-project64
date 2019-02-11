var Game = require("./Game").Game;

var ItemUseTable = mem.typedef(
{
    Ocarina: GlobalMem.u8,
    Bow: GlobalMem.u8,
    FireArrows: GlobalMem.u8,
    IceArrows: GlobalMem.u8,
    LightArrows: GlobalMem.u8,
    QuestItem1: GlobalMem.u8,
    Bombs: GlobalMem.u8,
    Bombchus: GlobalMem.u8,
    DekuSticks: GlobalMem.u8,
    DekuNuts: GlobalMem.u8,
    MagicBeans: GlobalMem.u8,
    QuestItem2: GlobalMem.u8,
    PowderKeg: GlobalMem.u8,
    Pictograph: GlobalMem.u8,
    LensOfTruth: GlobalMem.u8,
    Hookshot: GlobalMem.u8,
    GreatFairySword: GlobalMem.u8,
    QuestItem3: GlobalMem.u8,

});

var Link = (function () {
    function Link() {}
    Link.initialize = function (mem, u8, u16, u32) {
        
        this.magic_meter_max = 0x30;
        this.double_magic_meter_max = 0x60;
        
        
        mem.bindvar(this, 0x801EF6A6 , 'health', u16);
        mem.bindvar(this, 0x801EF6A4  , 'max_health', u16);
        
        mem.bindvar(this, 0x801EF6A9 , 'magic', u8);
        
        mem.bindvar(this, 0x801EF6AA , 'rupees', u16);    
        mem.bindvar(this, 0x801EF72A , 'wallet', u8);    

        // mem.bindvar(this, 0x803FDA3D , 'pauseMenuState', u8); 
        
        mem.bindvar(this, 0x801EF6BC, 'b_button_item', u8);
        mem.bindvar(this, 0x801EF6BD, 'cleft_button_item', u8);
        mem.bindvar(this, 0x801EF6BE, 'cdown_button_item', u8);
        mem.bindvar(this, 0x801EF6BF, 'cright_button_item', u8);  
        
        this.HylianUseTable = new ItemUseTable(0x801C25D8);
        this.DekuUseTable = new ItemUseTable(0x801C2566);
        this.GoronUseTable = new ItemUseTable(0x801C2482);
        this.ZoraUseTable = new ItemUseTable(0x801C24F4);
        this.FierceDeityUseTable = new ItemUseTable(0x801C2410);
        
    };
    
    Link.has_magic_meter = function(){
        return (mem.u8[0x801EF6B0] != 0 || mem.u8[0x801EF6B1] != 0);
    };
    
    Link.has_double_magic_meter = function(){
        return (mem.u8[0x801EF6B1] != 0);
    };
    
    Link.get_max_magic = function() {
        if (!this.has_magic_meter()){
            return 0;
        }
        
        if (!this.has_double_magic_meter()){
            return this.magic_meter_max;
        }
        

        return this.double_magic_meter_max;
    };
    
    
    Link.get_max_rupees = function() {
        var WalletArray = [Game.Wallets.child, Game.Wallets.adult, Game.Wallets.giant];
        
        for (var i = 0; i < WalletArray.length; i++) {
            if (WalletArray[i].wallet == Link.wallet) {
                return WalletArray[i].size;
            }
        }
        return 0;

    };
    // Link.isCrawling = function () {
        // return this.crawlState == 0x2708;
    // };
    return Link;
})();
exports.Link = Link;
