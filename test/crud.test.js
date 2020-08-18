/* eslint-disable no-param-reassign */
const { describe, it } = require('mocha');
const { expect } = require('chai');
const app = require('superagent');

const Token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJCbGFza28iLCJzdWIiOiI1ZTI0YjYwNDlhN2UyODEzYzg3YmZkOGMiLCJpYXQiOjE1Nzk1NDAwNzk0OTEsImV4cCI6MTU3OTYyNjQ3OTQ5MX0.O6dpq4laFfoZsP6LHIx_6S5a1V_hXC4ZLMmYIFxkIxk';

app.prototype.bearer = function(token) {
  this.set('Authorization', 'Bearer ' + token);
};

const basePath = function(req) {
  if (req.url[0] === '/')
    req.url = `http://localhost:3000/api/v1/shop${req.url}`;
  req.set('Authorization', 'Bearer ' + Token);
  return req;
};

/**
 * Tests CRUD operation urls
 * @param {*} data - used to create new
 * @param {string} path - the mount point after basePath
 * @param {*} expectations - expectations after fetching
 */
function testCRUD(data, name, path, updates = {}, expectations = {}, skip) {
  skip = skip || [];
  describe(`${name} crud test`, function() {
    this.bail(true);
    this.timeout(20000);
    let id = null;

    if (!skip.includes('create'))
      it('create', async () => {
        const res = await app
          .post(path)
          .use(basePath)
          .send(data);

        expect(res.status).eq(201);
        const m = res.body;

        if (!expectations) expectations = data;
        Object.keys(expectations).forEach(key => {
          const msg = `${key}: ${expectations[key]} !== ${m[key]}`;
          if (typeof expectations[key] === 'object') return;
          if (key) expect(expectations[key] == m[key], msg).to.be.true; // eslint-disable-line eqeqeq
        });
        id = res.body._id;
      });

    if (!skip.includes('list'))
      it('get list', async () => {
        const res = await app
          .get(path)
          .use(basePath)
          .send();

        expect(res.status).eq(200);
        const list = res.body;
        expect(list).to.be.instanceOf(Array);
        expect(list.length).gte(0);

        const inserted = list.filter(m => m._id === id)[0];
        expect(inserted).to.be.not.null;
      });

    if (!skip.includes('read'))
      it('get by id', async () => {
        expect(id).to.be.not.null;
        const res = await app
          .get(`${path}/${id}`)
          .use(basePath)
          .send();

        expect(res.status).eq(200);

        const m = res.body;
        expect(m).to.be.not.null;

        Object.keys(expectations).forEach(key => {
          const msg = `${key}: ${expectations[key]} !== ${m[key]}`;
          if (typeof expectations[key] === 'object') return;
          if (key) expect(expectations[key] == m[key], msg).to.be.true; // eslint-disable-line eqeqeq
        });
        if (res.status !== 200) console.trace(res.body);
      });

    if (!skip.includes('update'))
      it('update', async () => {
        const res = await app
          .patch(`${path}/${id}`)
          .use(basePath)
          .send(updates);

        expect(res.status).eq(202);
        const m = res.body;
        expect(m).to.be.not.null;

        const updatedExpect = { ...expectations, ...updates };
        Object.keys(updatedExpect).forEach(key => {
          const msg = `${key}: ${updatedExpect[key]} !== ${m[key]}`;
          if (typeof expectations[key] === 'object') return;
          if (key) expect(updatedExpect[key] == m[key], msg).to.be.true; // eslint-disable-line eqeqeq
        });
      });

    if (!skip.includes('delete'))
      it('delete', async () => {
        const res = await app
          .delete(`${path}/${id}`)
          .use(basePath)
          .send();

        if (res.status !== 204) console.trace(res.body);
        expect(res.status).eq(204);

        try {
          let r = await app.get(`${path}/${id}`).use(basePath);
          expect(r.status).not.eq(200);
        } catch (err) {
          expect(err.status).eq(404);
        }
      });
  });
}

module.exports = testCRUD;
