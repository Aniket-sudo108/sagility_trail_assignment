// src/shared/components/Error.tsx
type ErrorProps = {
  message?: string; // make message optional
};

export const Error = ({ message }: ErrorProps) => {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded">
      <h2 className="font-semibold">Something went wrong!</h2>
      {message && <p>{message}</p>}
    </div>
  );
};