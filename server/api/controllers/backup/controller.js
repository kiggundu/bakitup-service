import configStore from '../../services/configJSONFileStore.service';
import log from '../../../../server/common/logger';

export class Controller {
  all(req, res) {
    configStore.all().then(r => {
      log.debug(r);
      res.json(r);
    });
  }

  byId(req, res) {
    configStore
      .byId(req.params.id)
      .then(r => {
        res.json(r);
        res.status(200).end();
      })
      .catch(ex => {
        res.json({ message: `Error: ${ex}` });
        res.status(500).end();
      });
  }

  execute(req, res) {
    const command = req.params.command;
    log.info(`===>Command: ${command}`);
    res.json({ message: `Command processed: ${command}` });
    res.status(200).end;
  }

  add(req, res) {
    configStore.insert(req.body).then(r =>
      res
        .status(201)
        .location(`/api/v1/config/entry/${r.id}`)
        .json(r)
    );
  }
}
export default new Controller();
