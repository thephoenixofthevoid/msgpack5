
var test    = require('tap').test
  , msgpack = require('../')

test('encode/decode 1 byte fixext data', function(t) {

  var encoder = msgpack()
    , all     = []

  function MyType(data) {
    this.data = data
  }

  function mytipeEncode(obj) {
    var buf = new Buffer(1)
    buf.writeUInt8(obj.data, 0)
    return buf
  }

  function mytipeDecode(data) {
    return new MyType(data.readUInt8(0))
  }

  encoder.register(0x42, MyType, mytipeEncode, mytipeDecode)

  all.push(new MyType(0))
  all.push(new MyType(1))
  all.push(new MyType(42))

  all.forEach(function(orig) {
    t.test('encoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = encoder.encode(orig)
      t.equal(buf.length, 3, 'must have the right length')
      t.equal(buf.readUInt8(0), 0xd4, 'must have the fixext header')
      t.equal(buf.readUInt8(1), 0x42, 'must include the custom type id')
      t.equal(buf.readUInt8(2), orig.data, 'must decode correctly')
      t.end()
    })

    t.test('decoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = new Buffer(3)
      buf[0] = 0xd4
      buf[1] = 0x42
      buf.writeUInt8(orig.data, 2)
      t.deepEqual(encoder.decode(buf), orig, 'must decode correctly')
      t.type(encoder.decode(buf), MyType, 'must have the correct prototype')
      t.end()
    })

    t.test('mirror test with a custom obj containing ' + orig.data, function(t) {
      t.deepEqual(encoder.decode(encoder.encode(orig)), orig, 'must stay the same')
      t.end()
    })
  })

  t.end()
})

test('encode/decode 2 bytes fixext data', function(t) {

  var encoder = msgpack()
    , all     = []

  function MyType(data) {
    this.data = data
  }

  function mytipeEncode(obj) {
    var buf = new Buffer(2)
    buf.writeUInt16BE(obj.data, 0)
    return buf
  }

  function mytipeDecode(data) {
    return new MyType(data.readUInt16BE(0))
  }

  encoder.register(0x42, MyType, mytipeEncode, mytipeDecode)

  all.push(new MyType(0))
  all.push(new MyType(1))
  all.push(new MyType(42))

  all.forEach(function(orig) {
    t.test('encoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = encoder.encode(orig)
      t.equal(buf.length, 4, 'must have the right length')
      t.equal(buf.readUInt8(0), 0xd5, 'must have the fixext header')
      t.equal(buf.readUInt8(1), 0x42, 'must include the custom type id')
      t.equal(buf.readUInt16BE(2), orig.data, 'must decode correctly')
      t.end()
    })

    t.test('decoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = new Buffer(4)
      buf[0] = 0xd5
      buf[1] = 0x42
      buf.writeUInt16BE(orig.data, 2)
      t.deepEqual(encoder.decode(buf), orig, 'must decode correctly')
      t.type(encoder.decode(buf), MyType, 'must have the correct prototype')
      t.end()
    })

    t.test('mirror test with a custom obj containing ' + orig.data, function(t) {
      t.deepEqual(encoder.decode(encoder.encode(orig)), orig, 'must stay the same')
      t.end()
    })
  })

  t.end()
})

test('encode/decode 4 bytes fixext data', function(t) {

  var encoder = msgpack()
    , all     = []

  function MyType(data) {
    this.data = data
  }

  function mytipeEncode(obj) {
    var buf = new Buffer(4)
    buf.writeUInt32BE(obj.data, 0)
    return buf
  }

  function mytipeDecode(data) {
    return new MyType(data.readUInt32BE(0))
  }

  encoder.register(0x44, MyType, mytipeEncode, mytipeDecode)

  all.push(new MyType(0))
  all.push(new MyType(1))
  all.push(new MyType(42))

  all.forEach(function(orig) {
    t.test('encoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = encoder.encode(orig)
      t.equal(buf.length, 6, 'must have the right length')
      t.equal(buf.readUInt8(0), 0xd6, 'must have the fixext header')
      t.equal(buf.readUInt8(1), 0x44, 'must include the custom type id')
      t.equal(buf.readUInt32BE(2), orig.data, 'must decode correctly')
      t.end()
    })

    t.test('decoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = new Buffer(6)
      buf[0] = 0xd6
      buf[1] = 0x44
      buf.writeUInt32BE(orig.data, 2)
      t.deepEqual(encoder.decode(buf), orig, 'must decode correctly')
      t.type(encoder.decode(buf), MyType, 'must have the correct prototype')
      t.end()
    })

    t.test('mirror test with a custom obj containing ' + orig.data, function(t) {
      t.deepEqual(encoder.decode(encoder.encode(orig)), orig, 'must stay the same')
      t.end()
    })
  })

  t.end()
})

test('encode/decode 8 bytes fixext data', function(t) {

  var encoder = msgpack()
    , all     = []

  function MyType(data) {
    this.data = data
  }

  function mytipeEncode(obj) {
    var buf = new Buffer(8)
    buf.writeUInt32BE(obj.data / 2, 0)
    buf.writeUInt32BE(obj.data / 2, 4)
    return buf
  }

  function mytipeDecode(data) {
    return new MyType(data.readUInt32BE(0) + data.readUInt32BE(4))
  }

  encoder.register(0x44, MyType, mytipeEncode, mytipeDecode)

  all.push(new MyType(2))
  all.push(new MyType(4))
  all.push(new MyType(42))

  all.forEach(function(orig) {
    t.test('encoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = encoder.encode(orig)
      t.equal(buf.length, 10, 'must have the right length')
      t.equal(buf.readUInt8(0), 0xd7, 'must have the fixext header')
      t.equal(buf.readUInt8(1), 0x44, 'must include the custom type id')
      t.equal(buf.readUInt32BE(2) + buf.readUInt32BE(6), orig.data, 'must decode correctly')
      t.end()
    })

    t.test('decoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = new Buffer(10)
      buf[0] = 0xd7
      buf[1] = 0x44
      buf.writeUInt32BE(orig.data / 2, 2)
      buf.writeUInt32BE(orig.data / 2, 6)
      t.deepEqual(encoder.decode(buf), orig, 'must decode correctly')
      t.type(encoder.decode(buf), MyType, 'must have the correct prototype')
      t.end()
    })

    t.test('mirror test with a custom obj containing ' + orig.data, function(t) {
      t.deepEqual(encoder.decode(encoder.encode(orig)), orig, 'must stay the same')
      t.end()
    })
  })

  t.end()
})

test('encode/decode 16 bytes fixext data', function(t) {

  var encoder = msgpack()
    , all     = []

  function MyType(data) {
    this.data = data
  }

  function mytipeEncode(obj) {
    var buf = new Buffer(16)
    buf.writeUInt32BE(obj.data / 4, 0)
    buf.writeUInt32BE(obj.data / 4, 4)
    buf.writeUInt32BE(obj.data / 4, 8)
    buf.writeUInt32BE(obj.data / 4, 12)
    return buf
  }

  function mytipeDecode(data) {
    return new MyType(data.readUInt32BE(0) + data.readUInt32BE(4) + data.readUInt32BE(8) + data.readUInt32BE(12))
  }

  encoder.register(0x46, MyType, mytipeEncode, mytipeDecode)

  all.push(new MyType(4))
  all.push(new MyType(8))
  all.push(new MyType(44))

  all.forEach(function(orig) {
    t.test('encoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = encoder.encode(orig)
      t.equal(buf.length, 18, 'must have the right length')
      t.equal(buf.readUInt8(0), 0xd8, 'must have the fixext header')
      t.equal(buf.readUInt8(1), 0x46, 'must include the custom type id')
      t.equal(buf.readUInt32BE(2) + buf.readUInt32BE(6) + buf.readUInt32BE(10) + buf.readUInt32BE(14), orig.data, 'must decode correctly')
      t.end()
    })

    t.test('decoding a custom obj encoded as ' + orig.data, function(t) {
      var buf = new Buffer(18)
      buf[0] = 0xd8
      buf[1] = 0x46
      buf.writeUInt32BE(orig.data / 4, 2)
      buf.writeUInt32BE(orig.data / 4, 6)
      buf.writeUInt32BE(orig.data / 4, 10)
      buf.writeUInt32BE(orig.data / 4, 14)
      t.type(encoder.decode(buf), MyType, 'must have the correct prototype')
      t.deepEqual(encoder.decode(buf), orig, 'must decode correctly')
      t.end()
    })

    t.test('mirror test with a custom obj containing ' + orig.data, function(t) {
      t.deepEqual(encoder.decode(encoder.encode(orig)), orig, 'must stay the same')
      t.end()
    })
  })

  t.end()
})