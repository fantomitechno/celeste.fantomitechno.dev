declare global {
	namespace App {
		interface Locals {
			user: { connected: boolean } | null;
			session: { connected: boolean } | null;
		}
	}
}

export {};
