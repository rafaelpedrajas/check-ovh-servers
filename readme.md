# 🚀 OVH Server Availability Checker

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green) ![License](https://img.shields.io/badge/license-MIT-blue)

Este proyecto permite comprobar la disponibilidad de servidores en los datacenters de OVH de manera automática y recibir notificaciones a través de Telegram cuando hay servidores disponibles. 

🔍 **¿Por qué usar este proyecto?**
- Automatiza la comprobación de disponibilidad de servidores OVH.
- Notifica inmediatamente a través de Telegram cuando un servidor está disponible.
- Configuración fácil y adaptable a tus necesidades.

---

## 📋 Características

- Consulta en tiempo real la disponibilidad de servidores en los datacenters de OVH.
- Soporte para múltiples datacenters y planes de servidor.
- Notificaciones automáticas mediante Telegram.
- Configuración de credenciales segura usando variables de entorno (`.env`).

---

## 🚀 Requisitos

- **Node.js** v18 o superior
- **npm** o **yarn**
- Una cuenta en OVH con credenciales de API (appKey, appSecret y consumerKey)
- Un bot de Telegram configurado para recibir notificaciones (token del bot y chat_id)

---

## 🛠️ Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/rafaelpedrajas/check-ovh-servers
cd check-ovh-servers
```

hola que tal
### 2. Instalar dependencias
```bash
npm install
```

### 3. Copia el example.env a .env
```bash
cp example.env .env
```
### 4. Rellena los datos necesarios
```bash
# Credenciales de OVH
OVH_APP_KEY=tu_app_key
OVH_APP_SECRET=tu_app_secret
OVH_CONSUMER_KEY=tu_consumer_key

# Configuración de Telegram
TELEGRAM_TOKEN=tu_token_de_telegram
TELEGRAM_CHAT_ID=tu_chat_id_de_telegram
```

🔒 Nota: Asegúrate de que el archivo .env está incluido en el archivo .gitignore para que no se suba al repositorio.

## ▶️ Uso
Ejecuta el script con el siguiente comando:
```bash
node check-ovh-servers.js
```
El script comenzará a verificar la disponibilidad de servidores y enviará un mensaje a través de Telegram si encuentra disponibilidad.

## 💬 Feedback
¡Tu feedback es bienvenido! Si tienes sugerencias o encuentras algún problema, abre un issue en el repositorio o envíame un mensaje. 😊

## 🌟 Contribuciones
¿Quieres colaborar? Siéntete libre de hacer un fork del proyecto, enviar pull requests o sugerir mejoras. ¡Tu ayuda es siempre bienvenida!