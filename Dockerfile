FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps 
COPY . .
EXPOSE 3000
RUN npx prisma generate
CMD ["npm", "run","dev"]        
