import { getSession } from "next-auth/react";
import { Session } from "next-auth";

// Function to get the authorization headers
export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const session = await getSession() as Session | null;

  if (!session?.user?.accessToken) {
    throw new Error("No access token found");
  }

  return {
    Authorization: `Bearer ${session.user.accessToken}`,
  };
};
