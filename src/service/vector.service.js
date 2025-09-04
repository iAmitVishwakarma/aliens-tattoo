const { Pinecone } = require('@pinecone-database/pinecone');

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const chatgptIndex = pc.index('cohort-chatgpt-clone');

async function createMemory({vector, metadata,messageId}) {
  await chatgptIndex.upsert([{
    id: messageId,
    values: vector,
    metadata: metadata
  }]);
}

async function queryVector(vector, limit = 5, metadata) {
  const result = await chatgptIndex.query({
    vector: vector,
    topK: limit,
    filter: metadata ? {  metadata } : undefined,
    includeMetadata: true,
  });
  return result;
}

module.exports = { 
  createMemory,
   queryVector 
  };