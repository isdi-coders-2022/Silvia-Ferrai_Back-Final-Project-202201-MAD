import * as crud from './ticket-crud.js';
import { mongoConnect } from './db.js';

describe('given a connection with a MongoDB', () => {
    describe('when a collection is defined and populated', () => {
        beforeAll(async () => {
            await mongoConnect();
        });
    });
});
