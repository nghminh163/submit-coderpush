// https://api.thecatapi.com/v1/images/search -> Endpoint for generate Cat image
const d = require('./data.json');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');

(async () => {
  const imgData = (await axios.get('https://api.thecatapi.com/v1/images/search?limit=100')).data;
  const data = [];
  const prisma = new PrismaClient();

  for (let i = 0; i < 10; i++) {
    data.push(
      prisma.user.create({
        data: {
          name: d[i].name,
          dob: new Date(d[i].dob),
          photoUrl: imgData[i]?.url || '',
        },
      }),
    );
  }
  await Promise.all(data);
})();
