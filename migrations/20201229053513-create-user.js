'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "citext";');
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // needed 
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.CITEXT
      },
      // added for user data
      type: {
        type: Sequelize.STRING
      },
      school: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      sexualOrientation: {
        type: Sequelize.STRING
      },
      race: {
        type: Sequelize.STRING
      },
      ethnicity: {
        type: Sequelize.STRING
      },
      collegeMajor: {
        type: Sequelize.STRING
      },
      geoLocation: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      industryExperience: {
        type: Sequelize.STRING
      },
      // end of things i added
      hashedPassword: {
        type: Sequelize.STRING
      },
      isAdmin: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      passwordResetToken: {
        type: Sequelize.UUID
      },
      passwordResetTokenExpiresAt: {
        type: Sequelize.DATE
      },
      deactivatedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('Users', {
      fields: ['email'],
      unique: true
    });
    await queryInterface.addIndex('Users', {
      fields: ['passwordResetToken'],
      unique: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
