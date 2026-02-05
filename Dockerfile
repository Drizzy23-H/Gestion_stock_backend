
# 1️⃣ Image de base
FROM node:18-alpine

# 2️⃣ Dossier de travail
WORKDIR /app

# 3️⃣ Copier les fichiers package
COPY package*.json ./

# 4️⃣ Installer les dépendances
RUN npm install

# 5️⃣ Copier le reste du code
COPY . .

# 6️⃣ Exposer le port
EXPOSE 5000

# 7️⃣ Lancer le serveur
CMD ["npm", "start"]
