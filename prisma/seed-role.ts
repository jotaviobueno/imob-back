import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(roles: { name: string; permissions: string[] }[]) {
  return await prisma.$transaction(
    async (tx) => {
      for (const { name, permissions } of roles) {
        const nameAlreadyExist = await tx.role.findFirst({
          where: {
            name: name,
          },
        });

        if (nameAlreadyExist) return nameAlreadyExist;

        const role = await tx.role.create({
          data: {
            name,
          },
        });

        const permissionsCreated = await Promise.all(
          permissions.map(async (permission) => {
            const nameAlreadyExist = await tx.permission.findFirst({
              where: {
                name: permission,
              },
            });

            if (nameAlreadyExist) return nameAlreadyExist;

            return tx.permission.create({
              data: {
                name: permission,
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
                },
              },
            );

            if (roleAlreadyThisPermission) return nameAlreadyExist;

            return tx.rolePermission.create({
              data: {
                permissionId: permissionCreated.id,
                roleId: role.id,
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
  // ADMIN
  // DEV
  // FINANCE
  // USER
  // CUSTOMER

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
      'CAN_READ_ROLE',
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
      'CAN_READ_ROLE',
    ],
  },
  {
    name: 'FINANCE',
    permissions: [
      'CAN_CREATE_ADDRESS',
      'CAN_READ_ADDRESS',
      'CAN_UPDATE_ADDRESS',
      'CAN_DELETE_ADDRESS',
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
