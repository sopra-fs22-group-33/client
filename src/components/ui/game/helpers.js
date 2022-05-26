export const BOARD_LENGTH = 700;

export let CHUNK_LENGTH = 20;

export function setChunkLength(boardLength) {
  CHUNK_LENGTH = Math.ceil(BOARD_LENGTH / boardLength);
}

/*
converts information from backend to what we need in frontend and the other way around
 */
export function serialize(chunks) {
  const newChunks = [];
  chunks.forEach((chunk) => {
    newChunks.push({
      x: Math.ceil(chunk.x),
      y: Math.ceil(chunk.y),
    });
  });
  return newChunks;
}

export function deserialize(chunks) {
  const newChunks = [];
  chunks.forEach((chunk) => {
    newChunks.push({
      x: Math.ceil(chunk.x * CHUNK_LENGTH),
      y: Math.ceil(chunk.y * CHUNK_LENGTH),
    });
  });
  return newChunks;
}
