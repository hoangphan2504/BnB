# NodeJS Version 16
FROM node:16.18-buster-slim

# Copy Dir
COPY . ./app

# Work to Dir
WORKDIR /app

# Install Node Package
RUN npm install --legacy-peer-deps

# Set Env
ENV NODE_ENV production

EXPOSE 443

# Cmd script
CMD ["npm", "run", "dev"]
