var Link = (function () {
    function Link() {}
    Link.initialize = function (mem, u8, u16, u32) {
        this.magic_meter_max = 0x30;
        this.double_magic_meter_max = 0x60;
        
        mem.bindvar(this, 0x801EF6A6 , 'health', u16);
        mem.bindvar(this, 0x801EF6A4  , 'max_health', u16);
        
        mem.bindvar(this, 0x801EF6A9 , 'magic', u8);
        
        mem.bindvar(this, 0x801EF6AA , 'rupees', u16);        
        
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
    // Link.isCrawling = function () {
        // return this.crawlState == 0x2708;
    // };
    return Link;
})();
exports.Link = Link;
