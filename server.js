const http = require("http");
const RED = require("node-red");
const path = require("path");

// Créer un serveur HTTP
const server = http.createServer();

// Configuration de Node-RED
const settings = {
    httpAdminRoot: "/", // Interface Node-RED
    httpNodeRoot: "/api", // Endpoints accessibles
    userDir: path.join(__dirname, "data"), // Répertoire où se trouve flows.json
    flowFile: "flows.json", // Nom du fichier contenant les flux
    functionGlobalContext: {}, // Variables globales
    uiPort: process.env.PORT || 1880 // Utilisation du port défini par Render
};

// Initialiser Node-RED avec les paramètres
RED.init(server, settings);

// Démarrer le serveur HTTP
server.listen(process.env.PORT || 1880, () => {
    console.log(`Node-RED fonctionne sur le port ${process.env.PORT || 1880}`);
});

// Lancer Node-RED
RED.start();
