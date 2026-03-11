import { Client, Account ,Avatars,Storage,Databases} from "appwrite";
import { env } from  "@/app/env";
const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId); // Your project ID

const databases = new Databases(client);
const account = new Account(client);
const avatars= new Avatars(client)
const storage=new Storage(client)

export{client,account,avatars,storage}