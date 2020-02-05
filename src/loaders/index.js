const expressLoader = require('./express');

module.exports = async ( app ) => {
  
  await expressLoader( app );

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}