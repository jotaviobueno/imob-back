import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(roles: { name: string; permissions: string[] }[]) {
  return prisma.$transaction(
    async (tx) => {
      for (const { name, permissions } of roles) {
        const nameAlreadyExist = await tx.role.findFirst({
          where: {
            name: name,
            deletedAt: null,
          },
        });

        if (nameAlreadyExist) return nameAlreadyExist;

        const role = await tx.role.create({
          data: {
            name,
            deletedAt: null,
          },
        });

        const permissionsCreated = await Promise.all(
          permissions.map(async (permission) => {
            const nameAlreadyExist = await tx.permission.findFirst({
              where: {
                name: permission,
                deletedAt: null,
              },
            });

            if (nameAlreadyExist) return nameAlreadyExist;

            return tx.permission.create({
              data: {
                name: permission,
                deletedAt: null,
              },
            });
          }),
        );

        await Promise.all(
          permissionsCreated.map(async (permissionCreated) => {
            const roleAlreadyThisPermission = await tx.rolePermission.findFirst(
              {
                where: {
                  permissionId: permissionCreated.id,
                  roleId: role.id,
                  deletedAt: null,
                },
              },
            );

            if (roleAlreadyThisPermission) return nameAlreadyExist;

            return tx.rolePermission.create({
              data: {
                permissionId: permissionCreated.id,
                roleId: role.id,
                deletedAt: null,
              },
            });
          }),
        );
      }
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 550000, // default: 5000
    },
  );
}

const roles = [
  {
    name: 'ADMIN',
    permissions: [
      'CAN_CREATE_REAL_ESTATE',
      'CAN_READ_REAL_ESTATE',
      'CAN_UPDATE_REAL_ESTATE',
      'CAN_DELETE_REAL_ESTATE',
      //
      'CAN_CREATE_ADDRESS',
      'CAN_READ_ADDRESS',
      'CAN_UPDATE_ADDRESS',
      'CAN_DELETE_ADDRESS',
      //
      'CAN_READ_PERSON',
      'CAN_UPDATE_PERSON',
      'CAN_REMOVE_PERSON',
      //
      'CAN_ASSIGN_USER_IN_ROLE',
      'CAN_UNLINK_USER_IN_ROLE',
      //
      'CAN_CREATE_MENU',
      'CAN_UPDATE_MENU',
      'CAN_DELETE_MENU',
      //
      'CAN_READ_ROLE',
      //
      'CAN_CREATE_CUSTOMER',
      'CAN_READ_CUSTOMER',
      'CAN_UPDATE_CUSTOMER',
      'CAN_DELETE_CUSTOMER',
      //
      'CAN_CREATE_TYPE',
      'CAN_READ_TYPE',
      'CAN_UPDATE_TYPE',
      'CAN_DELETE_TYPE',
    ],
  },
  {
    name: 'DEV',
    permissions: [
      'CAN_CREATE_REAL_ESTATE',
      'CAN_READ_REAL_ESTATE',
      'CAN_UPDATE_REAL_ESTATE',
      'CAN_DELETE_REAL_ESTATE',
      //
      'CAN_CREATE_ADDRESS',
      'CAN_READ_ADDRESS',
      'CAN_UPDATE_ADDRESS',
      'CAN_DELETE_ADDRESS',
      //
      'CAN_READ_PERSON',
      'CAN_UPDATE_PERSON',
      'CAN_REMOVE_PERSON',
      //
      'CAN_ASSIGN_USER_IN_ROLE',
      'CAN_UNLINK_USER_IN_ROLE',
      //
      'CAN_CREATE_MENU',
      'CAN_UPDATE_MENU',
      'CAN_DELETE_MENU',
      //
      'CAN_READ_ROLE',
      //
      'CAN_CREATE_CUSTOMER',
      'CAN_READ_CUSTOMER',
      'CAN_UPDATE_CUSTOMER',
      'CAN_DELETE_CUSTOMER',
      //
      'CAN_CREATE_TYPE',
      'CAN_READ_TYPE',
      'CAN_UPDATE_TYPE',
      'CAN_DELETE_TYPE',
      //
      'CAN_CREATE_PROPERTY',
      'CAN_READ_PROPERTY',
      'CAN_UPDATE_PROPERTY',
      'CAN_DELETE_PROPERTY',
    ],
  },
  {
    name: 'FINANCE',
    permissions: [
      'CAN_CREATE_ADDRESS',
      'CAN_READ_ADDRESS',
      'CAN_UPDATE_ADDRESS',
      'CAN_DELETE_ADDRESS',
      //
      'CAN_CREATE_CUSTOMER',
      'CAN_READ_CUSTOMER',
      'CAN_UPDATE_CUSTOMER',
      'CAN_DELETE_CUSTOMER',
      //
      'CAN_CREATE_TYPE',
      'CAN_READ_TYPE',
      'CAN_UPDATE_TYPE',
      'CAN_DELETE_TYPE',
      //
      'CAN_CREATE_PROPERTY',
      'CAN_READ_PROPERTY',
      'CAN_UPDATE_PROPERTY',
      'CAN_DELETE_PROPERTY',
    ],
  },
  {
    name: 'CUSTOMER',
    permissions: [],
  },
  {
    name: 'USER',
    permissions: [],
  },
];

main(roles)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
