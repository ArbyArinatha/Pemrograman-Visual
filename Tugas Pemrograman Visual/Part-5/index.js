const electron = require("electron");
const {app, BrowserWindow, Menu, ipcMain} = electron;

let todayWindow;
let createWindow;
let listWindow;

app.on("ready",  () => {
    todayWindow = new BrowserWindow({
       webPreferences : {
           nodeIntegration : true
        },
        title : "Aplikasi Dokter"  
    });

    todayWindow.loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("closed", () => {
        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

const listWindowCreator = () =>{
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },

        width: 600,
        height: 400,
        title : "All Apointments"
    });
    
    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);

    listWindow.on("closed", () => (listWindow = null ));
};

const createWindowCreator = () =>{
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },

        width: 600,
        height: 400,
        title : "Create Apointments"
    });
    
    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);

    createWindow.on("closed", () => (createtWindow = null ));
};

const aboutWindowCreator = () =>{
    aboutWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration : true
        },

        width: 600,
        height: 400,
        title : "About"
    });
    
    aboutWindow.setMenu(null);
    aboutWindow.loadURL(`file://${__dirname}/about.html`);

    aboutWindow.on("about", () => (aboutWindow = null ));
};

ipcMain.on("appointment:create", (event, appointment) =>{
    console.log(appointment);
});

ipcMain.on("appointment:request:list", event => {
    console.log("here");
});

ipcMain.on("appointment:request:today", event => {
    console.log("here2");
});

ipcMain.on("appointment:done",  id => {
    console.log("here3");
});
 
 
const menuTemplate = [{
    label : "File",
    submenu : [{
        label : "New Appointment",

            click(){
                createWindowCreator();
            }
        },
        {
            label : "All Apointment",
            click(){
                listWindowCreator();
            }
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
},
{
    label: "View",
    submenu : [{ role : "reload"}, {role: "toggledevtools"}]
},
{
    label: "About",
    click(){
        aboutWindowCreator();
    
    }

    
}

]