const {
    signalRClient: signalRClient    
} = require("./signalr.util");
const qrcode = require('qrcode-terminal');

const { Client: Client, MessageMedia: MessageMedia } = require("whatsapp-web.js");


signalRClient.start().then(() => {
    console.log("yeeey!");
}).catch((e) => {
    console.log(e);
});

const client = new Client();


signalRClient.on("ReceiveMessage", (user, message) => {
    console.log(user + ':' + message );
});

const waitFor = e => new Promise(n => setTimeout(n, e))

const asyncForEach = async (e, n) => {
    for (let t = 0; t < e.length; t++) await n(e[t], t, e)
}

const startWhatsapp = () => {
    (async () => {
        try {
            await client.initialize()
        } catch (client) {
            console.log("initialize error ....");
        }
    })(),
    client.on("authenticated", client => {
        const s = "- Authenticated";
        console.log(s)
    }), 
    client.on("qr", (qr) => {
        const n = "- Scan QRCode...";        
        qrcode.generate(qr, {small: true});
    }),
    client.on('ready', () => {
        console.log('Client is ready!');
    }), 
    client.on('message', message => {
        try 
        {
            console.log(message);
            signalRClient.invoke("sendMessage", message.from, message.body)
        }catch {
            console.log('error');
        }        
    });
}

startWhatsapp();
// connection.start()
//     .then(() => connection.invoke("send", "Hello"));

// connection.start().then(() => {
//     console.log("yeeey!");
// }).catch((e) => {
//     console.log(e);
// // });