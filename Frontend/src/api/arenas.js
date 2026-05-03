import { apiRequest } from "./client.js";

/**
 * @param {Record<string, unknown>} body — name, sport, location, pricePerSlot, owner, optional description, isAvailable
 */
export async function createArena(body) {
  return apiRequest("POST", "/api/arenas", { body });
}

/**
 * @param {string} arenaId
 * @param {Record<string, unknown>} body — name, sport; optional sortOrder, isActive, visible
 */
export async function createArenaCourt(arenaId, body) {
  return apiRequest("POST", `/api/arenas/${encodeURIComponent(arenaId)}/courts`, { body });
}
