const electron = require("electron");

const {app, BrowserWindow, Menu, ipcMain} = electron ;

let awalWindow;
let prismaWindow;
let kubusWindow;
let kerucutWindow;
let tabungWindow;
let luasjajarangenjangWindow;
let kelilingjWindow;


app.on("ready", ()=> {
    awalWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title : "Program Hitung Luas Bangun"
    });

    awalWindow. loadURL(`file://${__dirname}/awal.html`);
    awalWindow.on("closed", () => {



        app.quit();
        awalWindow = null;
    });
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

const kubusWindowCreator = () => {
    kubusWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Luas Kubus"
    });
    kubusWindow.setMenu(null);
    kubusWindow.loadURL(`file://${__dirname}/kubus.html`);

};

const luasjajarangenjangWindowCreator = () => {
    luasjajarangenjangWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Hitung jajar Genjang"
    });
    luasjajarangenjangWindow.setMenu(null);
    luasjajarangenjangWindow.loadURL(`file://${__dirname}/luasjajarangenjang.html`);

};

const kelilingjWindowCreator = () => {
    kelilingjWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Hitung jajar Genjang"
    });
    kelilingjWindow.setMenu(null);
    kelilingjWindow.loadURL(`file://${__dirname}/kelilingj.html`);
 
};

const prismaWindowCreator = () => {
    prismaWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Luas Prisma Segitiga"
    });
    prismaWindow.setMenu(null);
    prismaWindow.loadURL(`file://${__dirname}/prisma.html`);

};

const tabungWindowCreator = () => {
    tabungWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "luas Tabung"
    });
    tabungWindow.setMenu(null);
    tabungWindow.loadURL(`file://${__dirname}/tabung.html`);

};

const kerucutWindowCreator = () => {
    kerucutWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Luas Kerucut"
    });
    kerucutWindow.setMenu(null);
    kerucutWindow.loadURL(`file://${__dirname}/kerucut.html`);

};



const menuTemplate = [{
    label : "File",
    submenu : [{
        
            label: "View",
            submenu : [{ role : "reload"}, {role: "toggledevtools"}]
        },
        {
            label : "Riwayat",
            click(){
                listWindowCreator();
            }
        },

    ]
    
},
            {
                label: "Quit",
                accelerato : process.platform === "darwin" ? "Command+Q" :
                "Ctrl+Q",
                click(){
                app.quit(); 
            }
}


]