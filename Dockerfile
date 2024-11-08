FROM node:20.18-alpine

WORKDIR /app

# 패키지 파일 복사 및 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 개발 서버 포트
EXPOSE 3000

# 개발 서버 실행
CMD ["npm", "start"]