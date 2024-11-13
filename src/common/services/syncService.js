// "use strict";

// const axios = require("axios");
// const { syncAllContentToProduction } = require("./syncServicesAll");

// module.exports = {
//   // Sync a single document to production
//   async syncContentToProduction(contentData) {
//     const productionApiUrl = process.env.PRODUCTION_API_URL || 'http://localhost:1337/api/articles';
//     const apiKey = process.env.PRODUCTION_API_KEY || 'YOUR_API_KEY';

//     try {
//       const { stageId } = contentData;
//       let existingContent = null;
//       let response = null;

//       try {
//         response = await axios.get(`${productionApiUrl}?filters[stageId][$eq]=${'' + stageId}`, {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//           },
//         });

//         const items = response.data.data;
//         if (items.length > 0) {
//           existingContent = items.filter((item) => item?.stageId === stageId);
//         }
//       } catch (checkError) {
//         console.warn(`Content with stageId ${stageId} not found, creating new entry.`);
//       }

//       if (response?.status === 200 && existingContent?.length > 0) {
//         const contentId = existingContent[0].id;

//         const cleanedContentData = { ...contentData };
//         delete cleanedContentData?.locale;
//         delete cleanedContentData?.publishedAt;
//         delete cleanedContentData?.createdAt;
//         delete cleanedContentData?.updatedAt;
//         delete cleanedContentData?.id;

//         await axios.put(
//           `${productionApiUrl}/${contentId}`,
//           { data: cleanedContentData },
//           {
//             headers: {
//               Authorization: `Bearer ${apiKey}`,
//             },
//           }
//         );
//         console.log(`Content with stageId ${stageId} updated successfully in Production.`);
//         return { message: "Content updated successfully in Production." };
//       } else {
//         const payload = {
//           Title: contentData.Title,
//           stageId: contentData.stageId,
//         };

//         const res = await axios.post(
//           productionApiUrl,
//           { data: payload },
//           {
//             headers: {
//               Authorization: `Bearer ${apiKey}`,
//             },
//           }
//         );
//         console.log(`Content with stageId ${stageId} published successfully to Production.`);
//         return { message: "Content published successfully to Production." };
//       }
//     } catch (error) {
//       console.error("Error syncing content to Production:", error.response?.data?.error?.details?.errors || error.message);
//       throw new Error("Error syncing content to Production");
//     }
//   },

//   // Sync all documents of a specific content type to production
//   async syncAllContentToProduction(contentType) {
//     try {
//       const documents   = await strapi.entityService.findMany(contentType);
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
//         await syncAllContentToProduction(documentData); // This should now work properly
//       }

//       strapi.log.info(`All ${contentType} documents synced successfully to Production`);
//       return `All ${contentType} documents synced successfully`;
//     } catch (error) {
//       strapi.log.error(`Failed to sync all documents of ${contentType} to Production: ${error.message}`);
//       throw error;
//     }
//   },
// };
