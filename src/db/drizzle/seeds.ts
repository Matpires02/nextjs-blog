import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { drizzleDb } from ".";
import { postTable } from "./schemas";

(async () => {
  const jsonPostRepository = new JsonPostRepository();
  const posts = await jsonPostRepository.findAll();

  try {
    await drizzleDb.delete(postTable);
    await drizzleDb.insert(postTable).values(posts);
    console.log(posts.length + " posts foram salvos na base de dados.");
  } catch (error) {
    console.error("Erro:", error);
  }
})();
