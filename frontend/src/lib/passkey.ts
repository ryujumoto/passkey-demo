export class PasskeyUnsupportedError extends Error {
  constructor() {
    super("このブラウザはパスキーに対応していません。");
    this.name = "PasskeyUnsupportedError";
  }
}

export const createPasskey = async ({
  username,
  challenge,
  userId,
}: {
  username: string;
  challenge: BufferSource;
  userId: BufferSource;
}): Promise<RegistrationResponseJSON> => {
  if (!window.PublicKeyCredential) {
    throw new PasskeyUnsupportedError();
  }

  const credential = (await navigator.credentials.create({
    publicKey: {
      challenge,
      // Relying Party
      rp: {
        name: "passkey-demo",
        id: window.location.hostname,
      },
      user: {
        id: userId,
        name: username,
        displayName: username,
      },
      // Relying Partyがサポートする公開鍵アルゴリズムのリスト
      pubKeyCredParams: [
        { type: "public-key", alg: -7 }, // ES256
        { type: "public-key", alg: -257 }, // RS256
      ],
      attestation: "none",
      timeout: 360000, // 6分
    },
  })) as PublicKeyCredential;

  const result = credential.toJSON() as RegistrationResponseJSON;
  return result;
};

export const getPasskey = async ({
  challenge,
}: {
  challenge: BufferSource;
}): Promise<AuthenticationResponseJSON> => {
  if (!window.PublicKeyCredential) {
    throw new PasskeyUnsupportedError();
  }

  const credential = (await navigator.credentials.get({
    publicKey: {
      challenge,
      timeout: 120000, // 2分
    },
  })) as PublicKeyCredential;

  const result = credential.toJSON() as AuthenticationResponseJSON;
  return result;
};
