module.exports = (sequelize, Sequelize) => {
    const Customers = sequelize.define("customers", {
            name: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            contract_number: {
                type: Sequelize.STRING
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
            underscored: true
        })

    return Customers
}
