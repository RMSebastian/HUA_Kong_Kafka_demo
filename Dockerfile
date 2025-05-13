FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app
COPY . .

RUN npm install

# Volumen para logs y screenshots
VOLUME ["/app/test-results"]

CMD ["node", "monitor.js"]