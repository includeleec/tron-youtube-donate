const utils = {
    tronWeb: false,
    contract: false,

    async setTronWeb(tronWeb) {
        console.log('set Tronweb')
        this.tronWeb = tronWeb;
        this.contract = await tronWeb.contract().at(CONTRACT_ADDRESS)
    }
    
};

export default utils;