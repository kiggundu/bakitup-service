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
    configStore.byId(req.params.id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
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
