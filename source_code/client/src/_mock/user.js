import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  email: faker.company.name(),
  nationality: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Manager',
    'Staff Member',
    'Receptionist',
    'Maintainace Team',
    'Guest'
  ]),
}));
