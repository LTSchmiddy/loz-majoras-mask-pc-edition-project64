var GlobalMem = require("./GlobalMem").GlobalMem;

var WalletColor = (function () {
    function WalletColor(_coloraddr) {

        GlobalMem.mem.bindvar(this, _coloraddr , 'r', GlobalMem.u16); 
        GlobalMem.mem.bindvar(this, _coloraddr + 0x02 , 'g', GlobalMem.u16);   
        GlobalMem.mem.bindvar(this, _coloraddr + 0x04 , 'b', GlobalMem.u16);   
    }
    return WalletColor;
})();



var Wallet = (function () {
    function Wallet(_id, _sizeaddr, _digitsaddr, _coloraddr) {
        this.wallet = _id;
        GlobalMem.mem.bindvar(this, _sizeaddr , 'size', GlobalMem.u16); 
        GlobalMem.mem.bindvar(this, _digitsaddr , 'digits', GlobalMem.u16); 
        
        this.color = new WalletColor(_coloraddr)
        

    }
    
    Wallet.child = new Wallet(0x10, 0x801C1E2C, 0x801BFD24, 0x801BFD2C);
    Wallet.adult = new Wallet(0x20, 0x801C1E2E, 0x801BFD26, 0x801BFD2C + 6);
    Wallet.giant = new Wallet(0x30, 0x801C1E30, 0x801BFD28, 0x801BFD39);


    return Wallet;
})();
exports.Wallet = Wallet;


var Bag = (function () {
    function Bag(_smalladdr, _medaddr, _largeaddr) {

        GlobalMem.mem.bindvar(this, _smalladdr , 'size_small', GlobalMem.u16); 
        GlobalMem.mem.bindvar(this, _medaddr , 'size_med', GlobalMem.u16); 
        GlobalMem.mem.bindvar(this, _largeaddr , 'size_large', GlobalMem.u16); 
        
    }
    Bag.Quiver = new Bag(0x801C1E0E, 0x801C1E10, 0x801C1E12);
    Bag.Bombs = new Bag(0x801C1E16, 0x801C1E18, 0x801C1E1A);
    Bag.DekuSticks = new Bag(0x801C1E3E, 0x801C1E40, 0x801C1E42);
    Bag.DekuNuts = new Bag(0x801C1E46, 0x801C1E48, 0x801C1E4A);


    return Bag;
})();
exports.Bag = Bag;






var Game = (function () {
    function Game() {}
    Game.initialize = function (mem, u8, u16, u32) {
        // this.DialogDMAEndChar = String.fromCharCode(0xBF);
        this.DialogDMAEndChar = "¿"
        this.DialogDMA_addr = 0x803FCE1B;
        this.DialogDMA_size = 0x4F0;
        
        this.DialogPane_addr = 0x803FD34C;
        
        
        this.Wallets = Wallet;
        this.Bags = Bag;
        mem.bindvar(this, 0x803FDA3D , 'pauseMenuState', u8); 
        mem.bindvar(this, 0x801E4FAF  , 'WeaponTrailTime', u16); 
        mem.bindvar(this, 0x803FFEFF   , 'WeaponHoldingStyle', u16); 
        mem.bindvar(this, 0x811EF686   , 'TimeFlowModifier', u16); 
; 
        
    };
    
    
    Game.GetDialogDMA = function () { 

        return mem.getstring(this.DialogDMA_addr);;
    }
    Game.GetDialogPane = function () { 
        return mem.getstring(this.DialogPane_addr);

    }
    

    return Game;
})();
exports.Game = Game;
