import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';
import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');
  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at) 
    VALUES('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'xxx-123', 'now()')`,
  );

  await connection.close();
}

// eslint-disable-next-line no-console
create().then(() => console.log('User admin created'));
