import { Sequelize } from 'sequelize';

const Storage = async (options) => {
  const { adapter, connection, modelFactory } = options;
  const { sequelize, model } = await (async () => {
    try {
      let seq;
      if (adapter === 'sqlite::memory') {
        seq = new Sequelize(adapter);
      } else {
        seq = new Sequelize(connection, {
          logging: console.log,
          dialect: adapter
        });
      }

      await seq.authenticate();

      const model = modelFactory(seq);

      await seq.sync({ alter: { drop: false } });

      return { sequelize: seq, model };
    } catch(err) {
      console.log(err);
      throw new Error(err);
    }
  })();

  const create = async (data) => {
    const entity = await model.create(data);
    return entity.save();
  };

  const read = async (userId) => {
    return model.findOne({ where: { userId } });
  };

  const update = async (id, data) => {
    throw new Error('NotImplemented');
  };

  const remove = async (id) => {
    throw new Error('NotImplemented');
  };

  const destroyModel = async () => {
    return sequelize.drop();
  };

  const close = async () => {
    return sequelize.close();
  };

  return {
    create,
    read,
    update,
    remove,
    destroyModel,
    close,
  };
};

export { Storage };
