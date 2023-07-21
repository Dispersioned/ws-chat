type ConnectionStateProps = {
  isConnected: boolean;
};

export function ConnectionState({ isConnected }: ConnectionStateProps) {
  return <div>{isConnected ? 'connected' : 'not connected'}</div>;
}
