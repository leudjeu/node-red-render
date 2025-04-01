const express = require('express');
const mqtt = require('mqtt');

const app = express();

// Port utilisé par Render (défini automatiquement)
const PORT = process.env.PORT || 10000;

// Création d'un client MQTT
const MQTT_BROKER = 'mqtt://broker.hivemq.com';
const MQTT_TOPIC = 'test/topic';

const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
    console.log('✅ Connecté au broker MQTT');
    client.subscribe(MQTT_TOPIC, (err) => {
        if (err) {
            console.error('❌ Erreur de souscription:', err);
        } else {
            console.log(`📡 Souscrit au topic: ${MQTT_TOPIC}`);
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`📩 Message reçu sur ${topic}: ${message.toString()}`);
});

client.on('error', (err) => {
    console.error('⚠️ Erreur MQTT:', err);
});

// Route de test pour Render
app.get('/', (req, res) => {
    res.send('Node-RED fonctionne et le serveur est en ligne 🚀');
});

// Lancer le serveur Express
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
