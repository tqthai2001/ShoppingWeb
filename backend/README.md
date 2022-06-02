# Create a .env file and add this content:

DATABASE_URL='mysql://53ytx43fbo7p:pscale_pw_NP8hT3u-YdEmz6fhPNDSyQRBKIVBo5G3UgD6QTdPL5s@d9vgzh030yaj.us-east-3.psdb.cloud/eva_de_eva?sslaccept=strict'
SHADOW_DATABASE_URL='mysql://1lfijuwm387k:pscale_pw_2v461lB0gI6M-1jOmbZmjOK1xPzo46t8HVX6Mzjdl9A@693hd03htc08.us-east-4.psdb.cloud/eva_de_eva?sslaccept=strict'

# Open prisma studio:

npx prisma studio

# Execute these command in terminal to run server

#### Step 1

npm install

#### step 2

npx prisma generate

#### step 3

npm run start
