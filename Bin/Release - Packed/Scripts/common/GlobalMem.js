var GlobalMem = (function () {
    function GlobalMem() {}
    GlobalMem.initialize = function (mem, u8, u16, u32) {
        GlobalMem.mem = mem;
        GlobalMem.u8 = u8;
        GlobalMem.u16 = u16;
        GlobalMem.u32 = u32;
              
        mem.bindvar(this, 0x801F3310 , 'currentSaveFile', u32); 
        
        
        // GlobalMem.
    };
    
    return GlobalMem;
})();
exports.GlobalMem = GlobalMem;
