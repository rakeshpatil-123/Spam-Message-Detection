# Backend
FROM python:3.9-slim as backend
WORKDIR /app
COPY backend/ .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]

# Frontend
FROM node:16-alpine as frontend
WORKDIR /app
COPY frontend/ .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
