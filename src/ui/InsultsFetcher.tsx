import { fetchInsult } from "@/app/lib/actions";
export async function InsultsFetcher() {
  const insult = await fetchInsult();

  return <div>{insult}</div>
};
