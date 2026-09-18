import Pusher from "pusher-js";
import { api } from "./axios";

let pusher: Pusher | null = null;

const getPusher = async () => {
  if (pusher) return pusher;

  const response = await api.get<{ data: { key: string; cluster: string } }>(
    "/realtime/config",
  );
  pusher = new Pusher(response.data.data.key, {
    cluster: response.data.data.cluster,
    authEndpoint: `${process.env.NEXT_PUBLIC_API_URL}/realtime/auth`,
  });
  return pusher;
};

export const subscribeToSprint = async (
  sprintId: string | number,
  handlers: Record<string, (data: never) => void>,
) => {
  const client = await getPusher();
  const channelName = `private-sprint-${sprintId}`;
  const channel = client.subscribe(channelName);

  Object.entries(handlers).forEach(([event, handler]) => {
    channel.bind(event, handler);
  });

  return () => {
    Object.entries(handlers).forEach(([event, handler]) => {
      channel.unbind(event, handler);
    });
    client.unsubscribe(channelName);
  };
};
