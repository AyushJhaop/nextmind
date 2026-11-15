const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");

const INITIAL_PROGRAMMES = [
  {
    id: "prog-ai-foundations",
    title: "AI Foundations",
    slug: "ai-foundations",
    description:
      "Understand artificial intelligence, explore modern AI tools and learn how to use AI effectively.",
    level: "Beginner-friendly",
    duration: "Cohort Duration: [Editable Placeholder — e.g. 6 Weeks Guided Track]",
    isActive: 1,
  },
  {
    id: "prog-ai-automation",
    title: "AI & Automation",
    slug: "ai-and-automation",
    description:
      "Learn how to build intelligent workflows and automate repetitive tasks using modern AI tools.",
    level: "Beginner to Intermediate",
    duration: "Cohort Duration: [Editable Placeholder — e.g. 8 Weeks Builder Track]",
    isActive: 1,
  },
  {
    id: "prog-digital-product",
    title: "Digital Product & Technology",
    slug: "digital-product-and-technology",
    description:
      "Develop the technical and creative skills required to build modern digital products.",
    level: "Beginner to Intermediate",
    duration: "Cohort Duration: [Editable Placeholder — e.g. 10 Weeks Studio Track]",
    isActive: 1,
  },
];

function getDatabaseInstance() {
  if (globalThis.__nextmind_sqlite_db) {
    return globalThis.__nextmind_sqlite_db;
  }

  const dbDir = path.join(process.cwd(), "prisma");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const dbPath = path.join(dbDir, "nextmind.db");
  const db = new DatabaseSync(dbPath);

  db.exec(`
    PRAGMA busy_timeout = 5000;
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT PRIMARY KEY,
      "fullName" TEXT NOT NULL,
      "email" TEXT NOT NULL UNIQUE,
      "phone" TEXT NOT NULL,
      "createdAt" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "Programme" (
      "id" TEXT PRIMARY KEY,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL UNIQUE,
      "description" TEXT NOT NULL,
      "level" TEXT NOT NULL,
      "duration" TEXT NOT NULL,
      "isActive" INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS "Registration" (
      "id" TEXT PRIMARY KEY,
      "userId" TEXT NOT NULL,
      "programmeId" TEXT NOT NULL,
      "educationLevel" TEXT NOT NULL DEFAULT 'Undergraduate Student',
      "occupation" TEXT,
      "status" TEXT NOT NULL DEFAULT 'CONFIRMED',
      "registrationReference" TEXT NOT NULL UNIQUE,
      "createdAt" TEXT NOT NULL,
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
      FOREIGN KEY ("programmeId") REFERENCES "Programme"("id") ON DELETE RESTRICT,
      UNIQUE ("userId", "programmeId")
    );

    CREATE TABLE IF NOT EXISTS "Enquiry" (
      "id" TEXT PRIMARY KEY,
      "fullName" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT NOT NULL,
      "programmeInterest" TEXT NOT NULL,
      "educationLevel" TEXT NOT NULL,
      "preferredContactMethod" TEXT NOT NULL,
      "message" TEXT,
      "status" TEXT NOT NULL DEFAULT 'NEW',
      "createdAt" TEXT NOT NULL
    );
  `);

  const insertProgramme = db.prepare(`
    INSERT OR IGNORE INTO "Programme" ("id", "title", "slug", "description", "level", "duration", "isActive")
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const p of INITIAL_PROGRAMMES) {
    insertProgramme.run(
      p.id,
      p.title,
      p.slug,
      p.description,
      p.level,
      p.duration,
      p.isActive
    );
  }

  const regCount = db.prepare(`SELECT COUNT(*) as c FROM "Registration"`).get().c;
  const enqCount = db.prepare(`SELECT COUNT(*) as c FROM "Enquiry"`).get().c;

  if (regCount === 0 && enqCount === 0) {
    const now = new Date();
    const t1 = new Date(now.getTime() - 1000 * 60 * 180).toISOString();
    const t2 = new Date(now.getTime() - 1000 * 60 * 95).toISOString();
    const t3 = new Date(now.getTime() - 1000 * 60 * 42).toISOString();

    db.prepare(`
      INSERT OR IGNORE INTO "User" ("id", "fullName", "email", "phone", "createdAt")
      VALUES (?, ?, ?, ?, ?)
    `).run("usr-sample-1", "Sample Learner — Aanya Sharma", "aanya.sample@example.edu", "+91 98201 44120", t1);

    db.prepare(`
      INSERT OR IGNORE INTO "User" ("id", "fullName", "email", "phone", "createdAt")
      VALUES (?, ?, ?, ?, ?)
    `).run("usr-sample-2", "Sample Learner — Rohan Verma", "rohan.sample@example.edu", "+91 98114 78310", t2);

    db.prepare(`
      INSERT OR IGNORE INTO "Registration" ("id", "userId", "programmeId", "educationLevel", "occupation", "status", "registrationReference", "createdAt")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      "reg-sample-1",
      "usr-sample-1",
      "prog-ai-foundations",
      "Undergraduate Student (3rd / Final Year)",
      "B.Tech Computer Science Student",
      "CONFIRMED",
      "NM-2026-8412",
      t1
    );

    db.prepare(`
      INSERT OR IGNORE INTO "Registration" ("id", "userId", "programmeId", "educationLevel", "occupation", "status", "registrationReference", "createdAt")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      "reg-sample-2",
      "usr-sample-2",
      "prog-ai-automation",
      "Recent Graduate",
      "Operations Analyst",
      "CONFIRMED",
      "NM-2026-9104",
      t2
    );

    db.prepare(`
      INSERT OR IGNORE INTO "Enquiry" ("id", "fullName", "email", "phone", "programmeInterest", "educationLevel", "preferredContactMethod", "message", "status", "createdAt")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      "enq-sample-1",
      "Sample Enquiry — Vikram Nair",
      "vikram.sample@example.com",
      "+91 97650 11209",
      "Digital Product & Technology",
      "Undergraduate Student (3rd / Final Year)",
      "Phone Call",
      "Looking to understand how the portfolio projects are structured alongside college classes.",
      "NEW",
      t3
    );

    db.prepare(`
      INSERT OR IGNORE INTO "Enquiry" ("id", "fullName", "email", "phone", "programmeInterest", "educationLevel", "preferredContactMethod", "message", "status", "createdAt")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      "enq-sample-2",
      "Sample Enquiry — Meera Krishnan",
      "meera.sample@example.com",
      "+91 99001 64321",
      "AI & Automation",
      "Young Professional",
      "Email",
      "Interested in workflow automation and API integrations for marketing ops.",
      "CONTACTED",
      t2
    );
  }

  globalThis.__nextmind_sqlite_db = db;
  return db;
}

function normalizeProgramme(row) {
  if (!row) return null;
  return {
    ...row,
    isActive: Boolean(row.isActive),
  };
}

class PrismaClient {
  constructor() {
    this.user = {
      findUnique: async ({ where, include } = {}) => {
        const db = getDatabaseInstance();
        let row = null;
        if (where?.id) {
          row = db.prepare(`SELECT * FROM "User" WHERE "id" = ?`).get(where.id);
        } else if (where?.email) {
          row = db
            .prepare(`SELECT * FROM "User" WHERE LOWER("email") = LOWER(?)`)
            .get(where.email);
        }
        if (!row) return null;
        const result = { ...row, createdAt: new Date(row.createdAt) };
        if (include?.registrations) {
          const regs = db
            .prepare(`SELECT * FROM "Registration" WHERE "userId" = ? ORDER BY "createdAt" DESC`)
            .all(row.id);
          result.registrations = regs.map((r) => ({
            ...r,
            createdAt: new Date(r.createdAt),
          }));
        }
        return result;
      },

      upsert: async ({ where, update, create }) => {
        const db = getDatabaseInstance();
        const existing = await this.user.findUnique({ where });
        if (existing) {
          const fullName = update.fullName ?? existing.fullName;
          const phone = update.phone ?? existing.phone;
          db.prepare(`UPDATE "User" SET "fullName" = ?, "phone" = ? WHERE "id" = ?`).run(
            fullName,
            phone,
            existing.id
          );
          return this.user.findUnique({ where: { id: existing.id } });
        }
        const id = create.id || crypto.randomUUID();
        const createdAt = (create.createdAt ? new Date(create.createdAt) : new Date()).toISOString();
        db.prepare(
          `INSERT INTO "User" ("id", "fullName", "email", "phone", "createdAt") VALUES (?, ?, ?, ?, ?)`
        ).run(id, create.fullName, create.email.toLowerCase().trim(), create.phone, createdAt);
        return this.user.findUnique({ where: { id } });
      },

      create: async ({ data }) => {
        const db = getDatabaseInstance();
        const id = data.id || crypto.randomUUID();
        const createdAt = (data.createdAt ? new Date(data.createdAt) : new Date()).toISOString();
        db.prepare(
          `INSERT INTO "User" ("id", "fullName", "email", "phone", "createdAt") VALUES (?, ?, ?, ?, ?)`
        ).run(id, data.fullName, data.email.toLowerCase().trim(), data.phone, createdAt);
        return this.user.findUnique({ where: { id } });
      },

      findMany: async () => {
        const db = getDatabaseInstance();
        const rows = db.prepare(`SELECT * FROM "User" ORDER BY "createdAt" DESC`).all();
        return rows.map((r) => ({ ...r, createdAt: new Date(r.createdAt) }));
      },
    };

    this.programme = {
      findUnique: async ({ where } = {}) => {
        const db = getDatabaseInstance();
        let row = null;
        if (where?.id) {
          row = db.prepare(`SELECT * FROM "Programme" WHERE "id" = ?`).get(where.id);
        } else if (where?.slug) {
          row = db.prepare(`SELECT * FROM "Programme" WHERE "slug" = ?`).get(where.slug);
        }
        return normalizeProgramme(row);
      },

      findFirst: async ({ where } = {}) => {
        const db = getDatabaseInstance();
        if (where?.slug) {
          return this.programme.findUnique({ where: { slug: where.slug } });
        }
        if (where?.id) {
          return this.programme.findUnique({ where: { id: where.id } });
        }
        if (where?.title) {
          const row = db
            .prepare(`SELECT * FROM "Programme" WHERE LOWER("title") = LOWER(?)`)
            .get(where.title);
          return normalizeProgramme(row);
        }
        const row = db.prepare(`SELECT * FROM "Programme" LIMIT 1`).get();
        return normalizeProgramme(row);
      },

      findMany: async ({ where, include } = {}) => {
        const db = getDatabaseInstance();
        let sql = `SELECT * FROM "Programme"`;
        const params = [];
        if (where?.isActive !== undefined) {
          sql += ` WHERE "isActive" = ?`;
          params.push(where.isActive ? 1 : 0);
        }
        const rows = db.prepare(sql).all(...params);
        return rows.map((r) => {
          const prog = normalizeProgramme(r);
          if (include?._count?.select?.registrations) {
            const countRow = db
              .prepare(`SELECT COUNT(*) as c FROM "Registration" WHERE "programmeId" = ?`)
              .get(r.id);
            prog._count = { registrations: Number(countRow?.c || 0) };
          }
          return prog;
        });
      },

      upsert: async ({ where, update, create }) => {
        const db = getDatabaseInstance();
        const existing = await this.programme.findUnique({ where });
        if (existing) {
          db.prepare(
            `UPDATE "Programme" SET "title" = ?, "description" = ?, "level" = ?, "duration" = ?, "isActive" = ? WHERE "id" = ?`
          ).run(
            update.title ?? existing.title,
            update.description ?? existing.description,
            update.level ?? existing.level,
            update.duration ?? existing.duration,
            (update.isActive ?? existing.isActive) ? 1 : 0,
            existing.id
          );
          return this.programme.findUnique({ where: { id: existing.id } });
        }
        const id = create.id || crypto.randomUUID();
        db.prepare(
          `INSERT INTO "Programme" ("id", "title", "slug", "description", "level", "duration", "isActive") VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).run(
          id,
          create.title,
          create.slug,
          create.description,
          create.level,
          create.duration,
          (create.isActive ?? true) ? 1 : 0
        );
        return this.programme.findUnique({ where: { id } });
      },
    };

    this.registration = {
      findUnique: async ({ where, include } = {}) => {
        const db = getDatabaseInstance();
        let row = null;
        if (where?.id) {
          row = db.prepare(`SELECT * FROM "Registration" WHERE "id" = ?`).get(where.id);
        } else if (where?.registrationReference) {
          row = db
            .prepare(`SELECT * FROM "Registration" WHERE "registrationReference" = ?`)
            .get(where.registrationReference);
        } else if (where?.userId_programmeId) {
          row = db
            .prepare(`SELECT * FROM "Registration" WHERE "userId" = ? AND "programmeId" = ?`)
            .get(where.userId_programmeId.userId, where.userId_programmeId.programmeId);
        }
        if (!row) return null;
        return this._hydrateRegistration(row, include);
      },

      findFirst: async ({ where, include } = {}) => {
        if (where?.userId && where?.programmeId) {
          return this.registration.findUnique({
            where: {
              userId_programmeId: {
                userId: where.userId,
                programmeId: where.programmeId,
              },
            },
            include,
          });
        }
        if (where?.registrationReference) {
          return this.registration.findUnique({
            where: { registrationReference: where.registrationReference },
            include,
          });
        }
        return null;
      },

      create: async ({ data, include } = {}) => {
        const db = getDatabaseInstance();
        const id = data.id || crypto.randomUUID();
        const createdAt = (data.createdAt ? new Date(data.createdAt) : new Date()).toISOString();
        db.prepare(
          `INSERT INTO "Registration" ("id", "userId", "programmeId", "educationLevel", "occupation", "status", "registrationReference", "createdAt")
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).run(
          id,
          data.userId,
          data.programmeId,
          data.educationLevel || "Undergraduate Student",
          data.occupation || null,
          data.status || "CONFIRMED",
          data.registrationReference,
          createdAt
        );
        return this.registration.findUnique({ where: { id }, include });
      },

      update: async ({ where, data, include } = {}) => {
        const db = getDatabaseInstance();
        const existing = await this.registration.findUnique({ where });
        if (!existing) throw new Error("Registration not found");
        const status = data.status ?? existing.status;
        db.prepare(`UPDATE "Registration" SET "status" = ? WHERE "id" = ?`).run(status, existing.id);
        return this.registration.findUnique({ where: { id: existing.id }, include });
      },

      findMany: async ({ where, include } = {}) => {
        const db = getDatabaseInstance();
        let rows = db.prepare(`SELECT * FROM "Registration" ORDER BY "createdAt" DESC`).all();
        let hydrated = await Promise.all(
          rows.map((r) => this._hydrateRegistration(r, { user: true, programme: true, ...include }))
        );
        if (where?.programmeId) {
          hydrated = hydrated.filter((r) => r.programmeId === where.programmeId);
        }
        if (where?.status) {
          hydrated = hydrated.filter((r) => r.status === where.status);
        }
        return hydrated;
      },

      count: async ({ where } = {}) => {
        const db = getDatabaseInstance();
        if (where?.programmeId) {
          const row = db
            .prepare(`SELECT COUNT(*) as c FROM "Registration" WHERE "programmeId" = ?`)
            .get(where.programmeId);
          return Number(row?.c || 0);
        }
        const row = db.prepare(`SELECT COUNT(*) as c FROM "Registration"`).get();
        return Number(row?.c || 0);
      },
    };

    this.enquiry = {
      findFirst: async ({ where } = {}) => {
        const db = getDatabaseInstance();
        if (where?.email && where?.programmeInterest) {
          const row = db
            .prepare(
              `SELECT * FROM "Enquiry" WHERE LOWER("email") = LOWER(?) AND LOWER("programmeInterest") = LOWER(?) ORDER BY "createdAt" DESC LIMIT 1`
            )
            .get(where.email, where.programmeInterest);
          if (!row) return null;
          return { ...row, createdAt: new Date(row.createdAt) };
        }
        return null;
      },

      findUnique: async ({ where } = {}) => {
        const db = getDatabaseInstance();
        if (!where?.id) return null;
        const row = db.prepare(`SELECT * FROM "Enquiry" WHERE "id" = ?`).get(where.id);
        if (!row) return null;
        return { ...row, createdAt: new Date(row.createdAt) };
      },

      create: async ({ data }) => {
        const db = getDatabaseInstance();
        const id = data.id || crypto.randomUUID();
        const createdAt = (data.createdAt ? new Date(data.createdAt) : new Date()).toISOString();
        db.prepare(
          `INSERT INTO "Enquiry" ("id", "fullName", "email", "phone", "programmeInterest", "educationLevel", "preferredContactMethod", "message", "status", "createdAt")
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).run(
          id,
          data.fullName,
          data.email.toLowerCase().trim(),
          data.phone,
          data.programmeInterest,
          data.educationLevel,
          data.preferredContactMethod,
          data.message || null,
          data.status || "NEW",
          createdAt
        );
        return this.enquiry.findUnique({ where: { id } });
      },

      update: async ({ where, data }) => {
        const db = getDatabaseInstance();
        const existing = await this.enquiry.findUnique({ where });
        if (!existing) throw new Error("Enquiry not found");
        const nextStatus = data.status ?? existing.status;
        db.prepare(`UPDATE "Enquiry" SET "status" = ? WHERE "id" = ?`).run(nextStatus, existing.id);
        return this.enquiry.findUnique({ where: { id: existing.id } });
      },

      findMany: async ({ where } = {}) => {
        const db = getDatabaseInstance();
        let rows = db
          .prepare(`SELECT * FROM "Enquiry" ORDER BY "createdAt" DESC`)
          .all()
          .map((r) => ({ ...r, createdAt: new Date(r.createdAt) }));
        if (where?.status) {
          rows = rows.filter((r) => r.status === where.status);
        }
        if (where?.programmeInterest) {
          rows = rows.filter(
            (r) => r.programmeInterest.toLowerCase() === where.programmeInterest.toLowerCase()
          );
        }
        return rows;
      },

      count: async () => {
        const db = getDatabaseInstance();
        const row = db.prepare(`SELECT COUNT(*) as c FROM "Enquiry"`).get();
        return Number(row?.c || 0);
      },
    };
  }

  async _hydrateRegistration(row, include) {
    const result = {
      ...row,
      createdAt: new Date(row.createdAt),
    };
    if (include?.user) {
      result.user = await this.user.findUnique({ where: { id: row.userId } });
    }
    if (include?.programme) {
      result.programme = await this.programme.findUnique({ where: { id: row.programmeId } });
    }
    return result;
  }

  async $transaction(fn) {
    return fn(this);
  }

  async $connect() {
    getDatabaseInstance();
    return true;
  }

  async $disconnect() {
    return true;
  }
}

module.exports = { PrismaClient };
