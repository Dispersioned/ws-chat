type RoomProps = {
  username: string;
};

export function Room({ username }: RoomProps) {
  return <div>Room. User {username}</div>;
}
