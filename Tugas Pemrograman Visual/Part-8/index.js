const electron = require("electron");
const { v4 : uuidv4} = require ('uuid');
uuidv4();

const {app, BrowserWindow, Menu, ipcMain} = electron;

let todayWindow;
let createWindow;
let listWindow;

let allAppointment = [];

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
    appointment["id"] = uuidv4();
    appointment["done"] = 0;
    allAppointment.push(appointment);
    sendTodayAppointments();
    createWindow.close();

    console.log(allAppointment);
});

ipcMain.on("appointment:request:list", event => {
    listWindow.webContents.send('appointment:response:list', allAppointment);
});

ipcMain.on("appointment:request:today", event => {
    sendTodayAppointments();
    console.log("here2");
});

ipcMain.on("appointment:done", (event,id) => {
    console.log("here3");
});


const sendTodayAppointments = () => {
    const today = new Date().toISOString().slice(0,10);
    const filtered = allAppointment.filter(
        appointment => appointment.date === today
    );

    todayWindow.webContents.send("appointment:response:today", filtered);
};
 
 
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