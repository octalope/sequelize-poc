import { DataTypes, Model } from 'sequelize';

const userModelFactory = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      // Model attributes are defined here
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      indexes: [{ fields: ['lastName', 'firstName'] }],
      sequelize: sequelize,
      modelName: 'User',
      // schema: 'SequelizePOC',
      freezeTableName: true,
    }
  );

  return User;
};

export default userModelFactory;
