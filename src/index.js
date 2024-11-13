'use strict';
// import { syncContentToProduction }  from './common/services/syncService.js';
// import { syncAllContentToProduction } from './common/services/syncServicesAll.js';
// import syncController from './common/controllers/syncController.js';
// import syncRoutes from './common/routes/sync.js'

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
// path: ./src/index.js

  register({ strapi }) {
    // // Register the service
    // strapi.service('common::syncService', syncContentToProduction({ strapi }));
    // strapi.service('common::syncServicesAll', syncAllContentToProduction({ strapi }));
    
    // // Register the controller
    // strapi.controller('common::syncController', syncController);

    // // Register the routes
    // strapi.api.routes(syncRoutes);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
