import * as dotenv from 'dotenv';

if (!process.env.NODE_ENV) {
    process.stdout.write('ENV variable has not been set.\nWorking in dev environment by default.\n');
}

const ENV: string = process.env.NODE_ENV || 'local';

dotenv.config({ path: `${__dirname}/../properties/${ENV}.properties`});

process.stdout.write(`Working in ${ENV} environment\n`);