const   expect      = require('chai').expect,
        request     = require('supertest'),
        basicSetup  = require('../../server/test/helper/basicSetup'),
        app         = require('../../server/app'),
        Project     = require('../api/models/projectModel');

describe('GET: /v1/project/:id route to get data', () => {
    
    let insertedData = {
        _id: '5f1f695549df9174a8c65530', 
        title:'Morbi',
        description: "Praesent dapibus turpis vel vehicula ultricies. Suspendisse a hendrerit lorem, ornare fermentum felis.",
        last_updated_at: "2020-07-27T23:55:01.864Z",
        created_at: "2020-07-27T23:55:01.864Z"
    }
    basicSetup();
    beforeEach((done) =>{
        new Project(insertedData)
                .save()
                .then(() => done())
                .catch((err) => done(err))
    })
    
    it('existing data', (done) => {
        request(app).get('/v1/project/5f1f695549df9174a8c65530')
                .then((res)=>{
                    expect(res.statusCode).to.equal(200);
                    expect(res.body).to.include(insertedData)
                    done()
                })
                .catch((err) => done(err))
    })

    it('non existent data', (done) => {
        request(app).get('/v1/project/5f7f695549df9174a8c65530')
                .then((res) => {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body).to.deep.equal({err:"data not found"});
                    done()
                })
                .catch((err) => done(err))
    })

    it('invalid id', (done) => {
        request(app).get('/v1/project/5f7äökkökkk')
                .then((res) => {
                    expect(res.statusCode).to.equal(500);
                    done()
                })
                .catch((err) => done(err))
    })
})