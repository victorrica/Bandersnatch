// @flow
import { app, Menu, shell, BrowserWindow } from 'electron';

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.mainWindow.maximize();
    this.mainWindow.setResizable(false);
    this.mainWindow.setFullScreen(true);
    this.mainWindow.setMovable(false);
    this.mainWindow.frame(false);
    this.mainWindow.transparent(true);
    
    this.mainWindow.setTitle(require('../package.json').productName);
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y);
          }
        }
      ]).popup(this.mainWindow);
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: 'Bandersnatch',
      submenu: [
        {
          label: 'About Bandersnatch',
          click: () => {
            const newWindow = new BrowserWindow({
              height: 900,
              resizable: true,
              width: 1280,
              minimizable: false,
              fullscreenable: false
            })
            newWindow.loadURL('https://github.com/victorrica/Bandersnatch');
          }
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]};
    return [subMenuAbout];
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: 'Bandersnatch',
        submenu: [
          {
            label: 'About Bandersnatch',
            click: () => {
              const newWindow = new BrowserWindow({
                height: 900,
                resizable: true,
                width: 1280,
                title: '',
                minimizable: false,
                fullscreenable: false
  
              })
              newWindow.loadURL('https://github.com/victorrica/Bandersnatch');
            }
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            }
          }
        ]
      }
    ];

    return templateDefault;
  }
}
