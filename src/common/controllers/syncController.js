// // path: ./src/common/controllers/syncController.js

// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('', ({ strapi }) => ({
//   async syncDocumentToProduction(ctx) {
//     const { contentType, documentId } = ctx.params;

//     try {
//       const result = await strapi.service('common::syncService').syncContentToProduction(contentType, documentId);
//       ctx.send({
//         message: `Document ID ${documentId} of content type ${contentType} synced successfully to Production`,
//         result,
//       });
//     } catch (error) {
//       ctx.throw(500, `Failed to sync document ID ${documentId} of content type ${contentType}`);
//     }
//   },

//   async syncAllDocumentsToProduction(ctx) {
//     const { contentType } = ctx.params;

//     try {
//       const result = await strapi.service('common::syncService').syncAllContentToProduction(contentType);
//       ctx.send({
//         message: `All documents of content type ${contentType} synced successfully to Production`,
//         result,
//       });
//     } catch (error) {
//       ctx.throw(500, `Failed to sync all documents of content type ${contentType}`);
//     }
//   },
// }));
