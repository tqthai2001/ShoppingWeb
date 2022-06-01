# Create a .env file and add this content:
SHADOW_DATABASE_URL='mysql://ndiew8ldfie0:pscale_pw_mK4fZJC738ebjTQkbZD80bSSCIxtkHzzXNIzAF1BUSk@693hd03htc08.us-east-4.psdb.cloud/eva_de_eva?sslaccept=strict'
DATABASE_URL='mysql://oxs3u3fweomm:pscale_pw_LlawiaqPGyZJ6_cdKZryDJKxkxKCFwdR3UKZmD7VR_Y@d9vgzh030yaj.us-east-3.psdb.cloud/eva_de_eva?sslaccept=strict'
# Open prisma studio: 
npx prisma studio 

# Execute these command in terminal to run server
#### Step 1
npm install
#### step 2
npx prisma generate
#### step 3
npm run start