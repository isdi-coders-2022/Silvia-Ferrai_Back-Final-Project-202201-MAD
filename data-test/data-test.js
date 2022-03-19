import bcrypt from 'bcryptjs';

export default {
    tickets: [
        {
            items: [
                {
                    uds: 2,
                    article: {
                        id: 2,
                        item: 'Marinara',
                        type: 'pizza',
                        price: 8.0,
                    },
                },
            ],
        },
        {
            items: [],
        },
    ],

    users: [
        { username: 'Pepe', password: bcrypt.hashSync('1234'), role: 'Sala' },
        {
            username: 'Elena',
            password: bcrypt.hashSync('1234'),
            role: 'Cocina',
        },
    ],
};
