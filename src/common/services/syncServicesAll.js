// "use strict";

// const axios = require("axios");

// module.exports = {
//      // Sync all documents of a specific content type to production
//   async syncAllContentToProduction(contentType) {
//     try {
//       const documents = await strapi.entityService.findMany(contentType);
//       if (documents.length === 0) {
//         strapi.log.info(`No documents found in content type ${contentType} to sync`);
//         return `No documents found to sync in ${contentType}`;
//       }

//       // Use a direct function call for `syncContentToProduction`
//       for (const document of documents) {
//         const documentData = {
//           ...document,
//           stageId: document.stageId,
//         };

//         // Sync each document to production
//         await this.syncContentToProduction(documentData); // This should now work properly
//       }

//       strapi.log.info(`All ${contentType} documents synced successfully to Production`);
//       return `All ${contentType} documents synced successfully`;
//     } catch (error) {
//       strapi.log.error(`Failed to sync all documents of ${contentType} to Production: ${error.message}`);
//       throw error;
//     }
//   }
// }