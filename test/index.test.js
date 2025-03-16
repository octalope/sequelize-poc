import { expect } from 'chai';

import { Storage } from '../lib/index.js';
import userModelFactory from '../lib/models/user.js';

describe('#index', () => {
  let User;

  [
    {
      adapter: 'sqlite::memory',
    },
    {
      adapter: 'mysql',
      connection: 'mysql://root:Lochness1!@127.0.0.1:3306/test',
    },
    {
      adapter: 'mssql',
      connection: 'mssql://newuser:Lochness1!@localhost:1433/test',
    },
  ].forEach((testCase) => {
    it(`creates a model, creates and reads a user using ${testCase.adapter}`, async () => {
      User = await Storage({
        adapter: testCase.adapter,
        connection: testCase.connection,
        modelFactory: userModelFactory,
      });

      const user = await User.create({
        userId: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
      });

      const readUser = await User.read(user.userId);

      expect(readUser.userId).to.equal(user.userId);
      expect(readUser.firstName).to.equal(user.firstName);
      expect(readUser.lasteName).to.equal(user.lasteName);

      await User.destroyModel();
      await User.close();
    });
  });
});
