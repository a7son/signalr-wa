const signalR = require("@microsoft/signalr"),    
    signalRClient = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5151/ChatHub")    
    .build();

module.exports = {
    signalRClient: signalRClient    
};