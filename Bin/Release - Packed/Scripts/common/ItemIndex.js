var GlobalMem = require("./GlobalMem").GlobalMem;

var ItemIndex = (function () {
    function ItemIndex(_id, _slotAddr) {
        this.id = _id;
        this.slotAddress = _slotAddr;
        // GlobalMem.mem.bindvar(this, _slotAddr, 'slot', GlobalMem.mem.u8);
         
    }
    ItemIndex.prototype.HasItem = function () {
        return (GlobalMem.mem.u8[this.slotAddress] == this.id);
    };

    
    // Defining Items:
    ItemIndex.Ocarina = new ItemIndex(0x00, 0x801EF6E0);
    // ItemIndex.GreatFairySword = new ItemIndex(0x10, 0x801EF6F0);
    ItemIndex.DekuMask = new ItemIndex(0x32, 0x801EF6FD);
    ItemIndex.GoronMask = new ItemIndex(0x33, 0x801EF703);
    ItemIndex.ZoraMask = new ItemIndex(0x34, 0x801EF709);

        

    return ItemIndex;
})();
exports.ItemIndex = ItemIndex;
