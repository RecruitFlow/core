import { get } from 'env-var';
import '../libs/utils/dotenv';

// https://github.com/Sairyss/backend-best-practices#configuration

export const kafkaConfig = {
  brokers: get('KAFKA_BROKERS').required().asArray(),
  services: {
    campaign: {
      clientId: 'campaign',
      groupId: 'campaign',
      name: 'campaign-client',
    },
    finder: {
      clientId: 'finder',
      groupId: 'finder-consumer',
      name: 'finder-client',
    },
  },
};
