import { ALL_CLIENTS } from "./mockData";
import { DetailedClient } from "./types";

const STORAGE_KEY = "firmly_clients";

export function getClients(): DetailedClient[] {
  if (typeof window === "undefined") return ALL_CLIENTS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ALL_CLIENTS));
    return ALL_CLIENTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse clients from storage", e);
    return ALL_CLIENTS;
  }
}

export function saveClients(clients: DetailedClient[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

export function getClientById(id: string): DetailedClient | null {
  const clients = getClients();
  return clients.find((c) => c.id === id) || null;
}

export function addClient(client: DetailedClient) {
  const clients = getClients();
  // Check if already exists to avoid duplicates
  if (clients.some((c) => c.id === client.id)) {
    return;
  }
  clients.unshift(client);
  saveClients(clients);
}

export function updateClient(updated: DetailedClient) {
  const clients = getClients();
  const index = clients.findIndex((c) => c.id === updated.id);
  if (index !== -1) {
    clients[index] = updated;
    saveClients(clients);
  }
}
