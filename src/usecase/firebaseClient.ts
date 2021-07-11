export interface FirebaseClient {
  createRoom(): Promise<string>;
}
