// import styles from "./page.module.css";
import { auth, signIn, signOut } from "@/../auth";

export default async function Home() {
  const session = await auth();

  if (session) {
    console.log("session", session);
    return (
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
