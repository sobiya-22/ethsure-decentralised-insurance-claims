import { useIdentityToken } from "@web3auth/modal/react";

function IdentityTokenButton() {
  const { getIdentityToken, loading, error, token } = useIdentityToken();

  return (
    <div>
      <button onClick={() => getIdentityToken()} disabled={loading}>
        {loading ? "Authenticating..." : "Get Identity Token"}
      </button>
      {token && <div>Token: {token}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}