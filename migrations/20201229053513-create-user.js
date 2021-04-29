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
        allowNull: false,
        type: Sequelize.STRING
      },
      school: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexualOrientation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      race: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ethnicity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      collegeMajor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      geoLocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      industryExperience: {
        allowNull: false,
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
