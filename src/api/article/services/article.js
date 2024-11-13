// path: ./src/services/productionSync.js

"use strict";

const axios = require("axios");

module.exports = {
  async syncContentToProduction(contentData) {
      
      const productionApiUrl = process.env.PRODUCTION_API_URL || 'http://localhost:1337/api/articles';
      const apiKey = process.env.PRODUCTION_API_KEY || '0d12209b5328c8c63c3474658f18dd1c0ce0c70e92267bdb7fbac34213cf1fa62de1a4bbc01667a36058e50db1a52f7158a7beaee5202bffe893478713565b7744c5f69b1332704d3d1cabc99f4ca388ce7e35965437ddf4f7f5ffb62e9467d27cac19324d32c3e0799da6b36c997f04c88bb4270ec1ad8f586447f485d738a4';
      
      try {
          // Extract the unique identifier for checking if content exists
          const { stageId } = contentData;
          let existingContent = null;
          let response = null;
        //   console.log('======================================================================')
          // Check if content with the given stageId already exists in Production
          try {
              response = await axios.get(`${productionApiUrl}?filters[stageId][$eq]=${''+stageId}`, {
                  headers: {
                      Authorization: `Bearer ${apiKey}`,
                    },
                });
  
          // Assuming response.data.data contains the content items
          const items = response?.data?.data;
          console.log("🚀 ~ file: article.js:31 ~ syncContentToProduction ~ items:", items)
          if (items.length > 0) {
            // If there's data, find the exact item by stageId
            existingContent = items?.map((item)=>{
                return item?.attributes?.stageId === stageId ? item : ''
            })
          }

      } catch (checkError) {
        console.warn(`Content with stageId ${stageId} not found, creating new entry.`,existingContent[0]?.data);
      }

      if (response?.status === 200 && existingContent?.length > 0  ) {
        // Update existing content if found
        const contentId = existingContent[0]?.id ; //for strapi v5 change it to documentId 
        console.log("🚀 ~ file: article.ts:43 ~ syncContentToProduction ~ contentId:", contentId)

        //delele unnecossory data
        delete contentData?.locale
        delete contentData?.publishedAt
        delete contentData?.createdAt
        delete contentData?.updatedAt
        delete contentData?.documentId
        delete contentData?.id

        
        await axios.put(
          `${productionApiUrl}/${contentId}`,
          {data : contentData},
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        console.log(`Content with stageId ${stageId} updated successfully in Production.`);
        return { message: "Content updated successfully in Production." };
      } else {
        console.log('-------------------------------------------------------------------------------')
        // Create new content if not found
        const payload = {
            Title : contentData.Title,
            stageId : contentData.stageId
        }
      const res =  await axios.post(
          productionApiUrl,
          {data : payload},
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        console.log(`Content with stageId ${stageId} published successfully to Production.`);
        return { message: "Content published successfully to Production." };
      }
    } catch (error) {
      console.log("🚀 ~ file: article.ts:64 ~ syncContentToProduction ~ error:", error)
      console.error("Error syncing content to Production:", error.response?.data?.error?.details?.errors || error.message);
      throw new Error("Error syncing content to Production");
    }
  },
};
