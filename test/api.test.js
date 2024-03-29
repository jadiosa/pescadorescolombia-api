var request = require('supertest');
var should = require('should'); 
var app = require('../app').app;

var MongoClient = require('mongodb').MongoClient;
var BSON = require('mongodb').BSONPure;

var uri = 'mongodb://localhost:27017/pescadorescolombiadbtest';


describe('Feed', function(){

	before(function(done) {
    	MongoClient.connect(uri, function(err, db) {
		    db.collection("feeds").insert(feeds, function(err, db) {
		    	done();
		    });
		    
		});
  	});

  	after(function (done) {
  		MongoClient.connect(uri, function(err, db) {
		    db.collection("feeds").remove({}, function(err, db) {
		    	done();
		    });
		    
		});
	});

	describe('#GET /feed', function(done){
		it('should return code 200', function(done){
			request(app)
		    	.get('/feed')
		    	.expect(200)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a Content-Type application/json', function(done){
			request(app)
		    	.get('/feed')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a json array', function(done){
			request(app)
		    	.get('/feed')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		should.not.exist(err);
		    		should.exist(res);
		    		res.body.should.be.an.Array.and.an.Object;
		    		res.body.should.have.length(2);
			        done()
			    });
		});
		it('should return all feeds', function(done){
			request(app)
		    	.get('/feed')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.should.have.length(2);
			        done()
			    });
		})
		it('should return likedByUser as true if a given user liked a feed', function(done){
			request(app)
		    	.get('/feed?userid=10152666156158057')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.forEach(function(feed) {
					    feed.likedByUser.should.be.true;
					});
					done();
			    });
		});
		it('should return likedByUser as false if a given user did not like a feed', function(done){
			request(app)
		    	.get('/feed?userid=10152666156158060')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.forEach(function(feed) {
					    feed.likedByUser.should.be.false;
					});
					done();
			    });
		});
		it('should return likedByUser as true/false if a given user liked/did not like feeds', function(done){
			request(app)
		    	.get('/feed?userid=10152666156158058')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.forEach(function(feed) {
		    			if(feed._id == '54412000f8d9b3020084c224')
		    				feed.likedByUser.should.be.true;
		    			else
		    				feed.likedByUser.should.be.false;
					});
					done();
			    });
		});
  	});
  	
  	describe('#GET /feed/:id', function(){
  		it('should return code 200', function(done){
			request(app)
		    	.get('/feed/54412000f8d9b3020084c223')
		    	.expect(200)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a Content-Type application/json', function(done){
			request(app)
		    	.get('/feed/54412000f8d9b3020084c223')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a correct json objetc', function(done){
			request(app)
		    	.get('/feed/54412000f8d9b3020084c223')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		should.not.exist(err);
		    		should.exist(res);
		    		res.body.should.be.an.Object;

		    		should.exist(res.body._id);
		    		should.exist(res.body.from);
		    		res.body.from.should.be.an.Object;
		    		should.exist(res.body.from.name);
		    		should.exist(res.body.from.facebookid);
		    		should.exist(res.body.message);
		    		should.exist(res.body.lastModified);
		    		should.exist(res.body.created_time);
		    		should.exist(res.body.likedByUser);
					done();
			    });
		});
		it('should return a feed with a given id', function(done){
			request(app)
		    	.get('/feed/54412000f8d9b3020084c223')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		should.not.exist(err);
		    		should.exist(res);
		    		res.body.should.be.an.Object;

		    		res.body._id.should.equal('54412000f8d9b3020084c223');
		    		res.body.from.name.should.equal('Jonathan Diosa');
		    		res.body.from.facebookid.should.equal('10152666156158057');
		    		res.body.message.should.equal('Me voy de pesca');
		    		res.body.lastModified.should.equal('2014-10-17T13:56:11.601Z');
		    		res.body.created_time.should.equal('2014-10-17T13:56:11.601Z');
					done();
			    });
		});
		it('should return likedByUser as true if a given user liked the feed', function(done){
			request(app)
		    	.get('/feed/54412000f8d9b3020084c223?userid=10152666156158057')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.likedByUser.should.be.true;
					done();
			    });
		});
		it('should return likedByUser as false if a given user did not like the feed', function(done){
			request(app)
		    	.get('/feed/54412000f8d9b3020084c223?userid=10152666156158058')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.likedByUser.should.be.false;
					done();
			    });
		});

  	});
	

  	describe('#POST /feed', function(){
  		it('should return code 200', function(done){
			request(app)
		    	.post('/feed')
		    	.send(newfeed)
		    	.expect(200)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a Content-Type application/json', function(done){
			request(app)
		    	.post('/feed')
		    	.send(newfeed)
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a correct json objetc', function(done){
			request(app)
		    	.post('/feed')
		    	.send(newfeed)
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.should.be.an.Object;
		    		should.exist(res.body._id);
		    		should.exist(res.body.from);
		    		res.body.from.should.be.an.Object;
		    		should.exist(res.body.from.name);
		    		should.exist(res.body.from.facebookid);
		    		should.exist(res.body.message);
		    		should.exist(res.body.lastModified);
		    		should.exist(res.body.created_time);
					done();
			    });
		});
		it('should return a json objetc with same information entered', function(done){
			request(app)
		    	.post('/feed')
		    	.send(newfeed)
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.from.name.should.equal('Jonathan Diosa');
		    		res.body.from.facebookid.should.equal('10152666156158057');
		    		res.body.message.should.equal('Me voy para el penol');
					done();
			    });
		});
  	}) 
});

describe('Catches', function(){

	before(function(done) {
    	MongoClient.connect(uri, function(err, db) {
		    db.collection("catches").insert(catches, function(err, db) {
		    	done();
		    });
		    
		});
  	});

  	after(function (done) {
  		MongoClient.connect(uri, function(err, db) {
		    db.collection("catches").remove({}, function(err, db) {
		    	done();
		    });
		    
		});
	});

	describe('#GET /catches/user/:userid', function(done){
		it('should return code 200', function(done){
			request(app)
		    	.get('/catches/user/10152666156158057')
		    	.expect(200)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a Content-Type application/json', function(done){
			request(app)
		    	.get('/catches/user/10152666156158057')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a json Array', function(done){
			request(app)
		    	.get('/catches/user/10152666156158057')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		should.not.exist(err);
		    		should.exist(res);
		    		res.body.should.be.an.Array.and.an.Object;
			        done()
			    });
		});
		it('should return only userid catches', function(done){
			request(app)
		    	.get('/catches/user/10152666156158057')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.should.have.length(2);

		    		res.body.forEach(function(item) {
		        		item.user.facebookid.should.equal('10152666156158057');
	        		});

			        done()
			    });
		})
  	});

	describe('#GET /catches/:id', function(done){
		it('should return code 200', function(done){
			request(app)
		    	.get('/catches/54412000f8d9b3020084c245')
		    	.expect(200)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a Content-Type application/json', function(done){
			request(app)
		    	.get('/catches/54412000f8d9b3020084c245')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return correct json object', function(done){
			request(app)
		    	.get('/catches/54412000f8d9b3020084c245')
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		should.not.exist(err);
		    		should.exist(res);
		    		res.body.should.be.an.Object;
		    		res.body.user.facebookid.should.equal('10152666156158057');
		    		res.body._id.should.equal('54412000f8d9b3020084c245');

			        done()
			    });
		})
  	});

	describe('#POST /catches', function(){
  		it('should return code 200', function(done){
			request(app)
		    	.post('/catches')
		    	.send(newcatch)
		    	.expect(200)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a Content-Type application/json', function(done){
			request(app)
		    	.post('/catches')
		    	.send(newcatch)
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
					done();
			    });
		});
		it('should return a correct json objetc', function(done){
			request(app)
		    	.post('/catches')
		    	.send(newcatch)
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		res.body.should.be.an.Object;
		    		//TODO:complete
					done();
			    });
		});
		it('should return a json objetc with same information entered', function(done){
			request(app)
		    	.post('/catches')
		    	.send(newfeed)
		    	.expect(200)
		    	.expect('Content-Type', /json/)
		    	.end(function(err, res){
		    		if (err) return done(err);
		    		//TODO:complete
					done();
			    });
		});
  	}) 

});

var feeds = [
				{
				    from: {
				        name: "Jonathan Diosa",
				        facebookid: "10152666156158057"
				    },
				    message: "Me voy de pesca",
				    lastModified: "2014-10-17T13:56:11.601Z",
				    created_time: "2014-10-17T13:56:11.601Z",
				    _id: new BSON.ObjectID('54412000f8d9b3020084c223'),
				    like: [
				        {
				            from: {
				                name: "Jonathan Diosa",
				                facebookid: "10152666156158057"
				            }
				        }
				    ],
				    likes: 1
				},
				{
				    from: {
				        name: "Jose Diosa",
				        facebookid: "10152666156158058"
				    },
				    message: "Me voy para los llanos",
				    lastModified: "2014-10-17T13:56:11.601Z",
				    created_time: "2014-10-17T13:56:11.601Z",
				    _id: new BSON.ObjectID('54412000f8d9b3020084c224'),
				    like: [
				        {
				            from: {
				                name: "Jonathan Diosa",
				                facebookid: "10152666156158057"
				            }
				        },
				        {
				            from: {
				                name: "Jose Diosa",
				                facebookid: "10152666156158058"
				            }
				        }
				    ],
				    likes: 1
				}
			];

var catches = [
				{
				    user: {
				        name: "Jonathan Diosa",
				        facebookid: "10152666156158057"
				    },
				    fishName: "Mojarra",
				    weight: "2",
				    placeName: "Estacion Cocorna",
				    placeLocation: "Estacion Cocorna",
				    date: "2014-10-17T13:56:11.601Z",
				    length: "42",
				    released: true,
				    message: "Me voy para los llanos",
				    _id: new BSON.ObjectID('54412000f8d9b3020084c244'),
				    tags: [
				        {
				            name: "Record"
				        },
				        {
				            name: "Mejor tamaño"
				        }
				    ]
				},
				{
				    user: {
				        name: "Jonathan Diosa",
				        facebookid: "10152666156158057"
				    },
				    fishName: "Picuda",
				    weight: "5",
				    placeName: "Estacion Cocorna",
				    placeLocation: "Estacion Cocorna",
				    date: "2014-10-17T13:56:11.601Z",
				    length: "42",
				    released: false,
				    message: "Me voy para los llanos",
				    _id: new BSON.ObjectID('54412000f8d9b3020084c245'),
				    tags: [
				        {
				            name: "Record"
				        },
				        {
				            name: "Mejor tamaño"
				        }
				    ]
				},
				{
				    user: {
				        name: "Fredy Higuita",
				        facebookid: "10152666156158059"
				    },
				    fishName: "Picuda",
				    weight: "5",
				    placeName: "Estacion Cocorna",
				    placeLocation: "Estacion Cocorna",
				    date: "2014-10-17T13:56:11.601Z",
				    length: "42",
				    released: false,
				    message: "Me voy para los llanos",
				    _id: new BSON.ObjectID('54412000f8d9b3020084c246'),
				    tags: [
				        {
				            name: "Record"
				        },
				        {
				            name: "Mejor tamaño"
				        }
				    ]
				}
			];

var newfeed = 
				{
				    from: {
				        name: "Jonathan Diosa",
				        facebookid: "10152666156158057"
				    },
				    message: "Me voy para el penol",				    
				};
var newcatch = 
				{
				    user: {
				        name: "Jonathan Diosa",
				        facebookid: "10152666156158057"
				    },
				    message: "Me voy para el penol",				    
				};