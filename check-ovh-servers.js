
require('dotenv').config();

/**
 * Credenciales para /dedicated/server/region/availabilities
 */
const ovh = require('@ovhcloud/node-ovh')({
  endpoint: 'ovh-eu',   // o 'ca' para Canadá
  appKey: process.env.OVH_APP_KEY,
  appSecret: process.env.OVH_APP_SECRET,
  consumerKey: process.env.OVH_CONSUMER_KEY
});

const TelegramBot = require('node-telegram-bot-api');

// Configurar el bot de Telegram
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(TELEGRAM_TOKEN);

//const apiURL = '/dedicated/server/datacenter/availabilities?datacenters=fra%2Cgra%2Crbx%2Csbg&planCode=24sk30&storage=softraid-2x480ssd'; //Server KS-3
//const apiURL = '/dedicated/server/datacenter/availabilities?datacenters=fra%2Cgra%2Crbx%2Csbg&planCode=24sk50'; // Server KS-5
const apiURL = '/dedicated/server/datacenter/availabilities?datacenters=fra%2Cgra%2Crbx%2Csbg&planCode=24ska01'; // Server KS-A

// Comprobar la disponibilidad en los datacenters
async function checkAvailability() {
  return new Promise((resolve, reject) => {
    ovh.request('GET', apiURL, (err, data) => {
      if (err) {
        console.error(`Error al realizar la solicitud: ${JSON.stringify(err, null, 2)}`);
        reject(err);
      } else {
        // Iterar sobre los servidores en el plan
        for (let server of data) {
          const { fqn, datacenters } = server;

          // Comprobar la disponibilidad en cada datacenter
          for (let datacenter of datacenters) {
            if (datacenter.availability !== 'unavailable') {
              // Si hay disponibilidad, resolver y enviar el servidor y datacenter disponibles
              resolve({
                fqn,
                datacenter: datacenter.datacenter,
                availability: datacenter.availability
              });
            }
          }
        }
        // Si no hay disponibilidad, resolver con null
        resolve(null);
      }
    });
  });
}

// Enviar un mensaje por Telegram
function sendTelegramMessage(message) {
  bot.sendMessage(TELEGRAM_CHAT_ID, message);
}

// Bucle para comprobar la disponibilidad cada minuto
async function startChecking() {
  try {
    while (true) {
      const availableServer = await checkAvailability();
      if (availableServer) {
        sendTelegramMessage(`¡El servidor ${availableServer.fqn} está disponible en ${availableServer.datacenter} con disponibilidad ${availableServer.availability}!`);
        break;
      } else {
        console.log('No hay servidores disponibles. Verificando nuevamente en 1 minuto...');
      }

      // Esperar 1 minuto antes de volver a comprobar
      await new Promise(resolve => setTimeout(resolve, 60000));
    }
  } catch (error) {
    console.error(`Error en la verificación: ${JSON.stringify(error, null, 2)}`);
  }
}

// Iniciar el proceso de verificación
startChecking();