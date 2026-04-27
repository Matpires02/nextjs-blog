import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(JWT_SECRET_KEY);
const LOGIN_EXPIRATION_SECONDS =
  Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const LOGIN_EXPIRATION_STRING = process.env.LOGIN_EXPIRATION_STRING || "1d";
const LOGIN_COOKIE_NAME = process.env.LOGIN_COOKIE_NAME || "loginSession";

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function hashPassword(password: string) {
  const hash = Buffer.from(await bcrypt.hash(password, 10)).toString("base64");

  return hash;
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(
    password,
    Buffer.from(hash, "base64").toString("utf-8"),
  );
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + LOGIN_EXPIRATION_SECONDS * 1000);
  const loginSession = await signJwt({ expiresAt, username });

  const cookieStore = await cookies();
  cookieStore.set(LOGIN_COOKIE_NAME, loginSession, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(LOGIN_COOKIE_NAME, "", {
    expires: new Date(0),
  });

  cookieStore.delete(LOGIN_COOKIE_NAME);
}

export async function getLoginSession() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(LOGIN_COOKIE_NAME)?.value;

  if (!jwt) return false;

  return verifyJwt(jwt);
}

export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();

  if (!jwtPayload) return false;

  return jwtPayload?.username === process.env.LOGIN_USER;
}

export async function requireLoginSessionOrRedirect() {
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) redirect("/admin/login");
}

export async function signJwt(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(LOGIN_EXPIRATION_STRING)
    .sign(jwtEncodedKey);
}

export async function verifyJwt(jwt: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.log("invalid Token");
    return false;
  }
}
