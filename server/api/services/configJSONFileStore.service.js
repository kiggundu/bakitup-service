import fs from 'fs';
import { promisify } from 'util';
import log from '../../common/logger';

class ConfigJSONFileStore {
  constructor() {}

  async all() {
    let configJson;

    try {
      const readConfig = promisify(fs.readFile);
      configJson = await readConfig('backup-config.json', 'utf8');
    } catch (e) {
      log.error(e);
      configJson = Promise.resolve([]);
    }

    return JSON.parse(configJson);
  }

  async byId(id) {
    log.info(`Getting entry for id: ${id}`);
    return this.all().then(data => (data[id] ? data[id] : {}));
  }

  insert(jsonObj) {
    let errString = `Not yet Implemented: ${jsonObj}`;
    log.error(errString);
    throw errString;
  }
}

export default new ConfigJSONFileStore();
