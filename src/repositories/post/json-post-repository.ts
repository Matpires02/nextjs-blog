import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";
import { asyncDelay } from "@/utils/async-delay";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json",
);

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");

    const { posts } = JSON.parse(jsonContent);

    return posts;
  }

  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS);
    return (await this.readFromDisk()).filter((p) => p.published);
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((f) => f.id === id);

    if (!post) throw new Error("Post não encontrado");
    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((f) => f.slug === slug);

    if (!post) throw new Error("Post com essa slug não foi encontrado");
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS);
    return await this.readFromDisk();
  }
}
