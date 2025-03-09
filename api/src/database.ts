import Database from 'better-sqlite3';
import path from 'path';

// 创建数据目录和数据库文件路径
const dbPath = path.join(__dirname, '..', 'data', 'database.sqlite');

// 创建数据库连接
const db = new Database(dbPath);

// 初始化数据库表
db.exec(`
  CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    username TEXT,
    email TEXT,
    phone TEXT
  )
`);

// 确保有初始记录
const initStmt = db.prepare(`
  INSERT OR IGNORE INTO profile (id, username, email, phone)
  VALUES (1, 'default', 'default@default.com', '')
`);
initStmt.run();

// 数据库操作
export const profileDb = {
  // 获取用户资料
  get: () => {
    const stmt = db.prepare('SELECT username, email, phone FROM profile WHERE id = 1');
    return stmt.get();
  },

  // 更新用户资料
  update: (data: { username: string; email: string; phone: string }) => {
    const stmt = db.prepare(`
      UPDATE profile
      SET username = ?, email = ?, phone = ?
      WHERE id = 1
    `);
    return stmt.run(data.username, data.email, data.phone);
  },
};

export default db;
