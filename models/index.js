const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

function generateSlug(title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

//create Page model
const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        //WHY NOT BOOLEAN
        type: Sequelize.ENUM('open', 'closed'),
        defaultValue: 'closed'
    }
});

Page.beforeValidate((page) => {
    if (!page.slug) {
        page.slug = generateSlug(page.title)
    }
})

//create User model
const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
    db,
    Page,
    User
}





