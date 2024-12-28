import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PLATFORM, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID, APPWRITE_USER_COLLECTION_ID, APPWRITE_VIDEO_COLLECTION_ID, APPWRITE_STORAGE_ID } from '@env';

export const appwriteConfig = {
  endpoint: APPWRITE_ENDPOINT,
  platform: APPWRITE_PLATFORM,
  projectId: APPWRITE_PROJECT_ID,
  databaseId: APPWRITE_DATABASE_ID,
  userCollectionId: APPWRITE_USER_COLLECTION_ID,
  videoCollectionId: APPWRITE_VIDEO_COLLECTION_ID,
  storageId: APPWRITE_STORAGE_ID
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId); // Your project ID

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error('Failed to create account');

    const avatarsUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarsUrl
      }
    );
    return newUser;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error('No current account found');

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw new Error('No current user found');
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};




export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    );

    return posts.documents;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};



