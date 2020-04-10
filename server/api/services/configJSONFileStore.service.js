import fs from 'fs';
import { promisify } from 'util';
import { run as jq } from 'node-jq';
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
    const filter = `.[] | select(.hash == "${id}")`;
    const data = await this.all();
    let retJson;

    try {
      log.debug(`==DATA===> ${JSON.stringify(data)}`);
      log.debug(`==FILTER===> ${filter}`);
      retJson = JSON.parse(
        await jq(filter, JSON.stringify(data), { input: 'string' })
      );
    } catch (jqEx) {
      log.error(`Caught JQ error: ${jqEx}`);
      retJson = {};
    }

    log.info(`Returning: ${retJson}`);
    return retJson;
  }

  insert(jsonObj) {
    let errString = `Not yet Implemented: ${jsonObj}`;
    log.error(errString);
    throw errString;
  }
}

export default new ConfigJSONFileStore();
