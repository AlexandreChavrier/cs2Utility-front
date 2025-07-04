FROM node:22-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du projet
COPY . .

# Variables d'environnement
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build de l'application Next.js
RUN npm run build

# Exposer le port
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]