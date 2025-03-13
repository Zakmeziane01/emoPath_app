import {
    Client,
    Account,
    ID,
    Databases,
    OAuthProvider,
    Avatars,
    Query,
    Storage,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";




  export const config = {
    platform: "com.jsm.EmoPath",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTIONS_ID,
    infoUserCollectionId: process.env.EXPO_PUBLIC_APPWRITE_INFO_USER_COLLECTIONS_ID,
    childrenCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CHILDREN_COLLECTIONS_ID,
    storageProjectId: process.env.EXPO_PUBLIC_APPWRITE_STOREGE_AVATAR_PROJECT_ID,
    storagePdfId: process.env.EXPO_PUBLIC_APPWRITE_STOREGE_PDF_FILES_ID,
    galleriesCollectionId:process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    propertiesCollectionId:process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
    bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
  };
  
  export const client = new Client();
  client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);
  
  export const avatar = new Avatars(client);
  export const account = new Account(client);
  export const databases = new Databases(client);
  export const storage = new Storage(client);

  
  export async function createUser({ email, password, username }: { email: string; password: string; username: string }) {
    try {
      // Step 1: Create the account in Appwrite
      const newAccount = await account.create(ID.unique(), email, password, username);
      if (!newAccount) throw new Error("Failed to create new account");
  
      // Step 2: Generate an avatar for the user (based on their username)
      const avatarUrl = avatar.getInitials(username);
  
      // Step 3: Store user information in the database
      await databases.createDocument(
        config.databaseId!,
        config.userCollectionId!,
        ID.unique(), // Generate a new unique ID for the document
        {
          userId: newAccount.$id, // Store the user ID from the created account
          email: email, // Store the user's email
          username: username, // Store the user's username
          avatar: avatarUrl.toString(), // Store the generated avatar URL
        }
      );
  
      console.log("User created successfully:", newAccount);
  
      // ✅ Return a properly structured user object
      return {
        $id: newAccount.$id,  // Appwrite User ID
        name: username,        // Ensure `name` is included
        email: email,          // User email
        avatar: avatarUrl.toString(), // User avatar
      };
    }  catch (error: any) {
      // Enhanced error handling: Ensure error is always a string or readable
      const errorMessage = error?.message || JSON.stringify(error);
      console.error("Error creating user:", errorMessage);
  
      // Throw the error with a more informative message
      throw new Error(`createUser Error: ${errorMessage}`);
    }
  }

  export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error: any) {
      // Enhanced error handling: Ensure error is always a string or readable
      const errorMessage = error?.message || JSON.stringify(error);
      console.error("Error getting account:", errorMessage);
        throw new Error(`SignIn Error: ${errorMessage}`);
      // Throw the error with a more informative message
      throw new Error(`createUser Error: ${errorMessage}`);
    }
  }
  
// Sign In
export async function signIn({ email, password}: { email: string; password: string}) {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error: any) {
      // Enhanced error handling: Ensure error is always a string or readable
      const errorMessage = error?.message || JSON.stringify(error);
      console.error("Error during the signIn:", errorMessage);
  
      // Throw the error with a more informative message
      throw new Error(`SignIn Error: ${errorMessage}`);
    }
  }
  
  export async function login() {
    try {
      const redirectUri = Linking.createURL("/");
  
      const response = await account.createOAuth2Token(
        OAuthProvider.Google,
        redirectUri
      );
      if (!response) throw new Error("Create OAuth2 token failed");
  
      const browserResult = await openAuthSessionAsync(
        response.toString(),
        redirectUri
      );
      if (browserResult.type !== "success")
        throw new Error("Create OAuth2 token failed the browser");
  
      const url = new URL(browserResult.url);
      const secret = url.searchParams.get("secret")?.toString();
      const userId = url.searchParams.get("userId")?.toString();
      if (!secret || !userId) throw new Error("Create OAuth2 token failed no secret ot userID");
  
      const session = await account.createSession(userId, secret);
      if (!session) throw new Error("Failed to create session");
  
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  export async function logout() {
    try {
      const result = await account.deleteSession("current");
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  export async function getCurrentUser() {
    try {
      const result = await account.get();
      if (result.$id) {
        const userAvatar = avatar.getInitials(result.name);
  
        return {
          ...result,
          avatar: userAvatar.toString(),
        };
      }
  
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }


// Function to update a specific user attribute in Appwrite
export const updateUserAttribute = async (userId: string, attributeName: string, value: string) => {
  try {
    // Prepare the object to be updated or created
    const fieldsToUpdate = {
      [attributeName]: value,
    };

    // Check if the document exists
    const userDocuments = await databases.listDocuments(
      config.databaseId!,
      config.infoUserCollectionId!,
      [Query.equal('userId', userId)]
    );

    if (userDocuments.documents.length > 0) {
      // Document exists, update it
      const userDocument = userDocuments.documents[0];
      await databases.updateDocument(
        config.databaseId!,
        config.infoUserCollectionId!,
        userDocument.$id,
        fieldsToUpdate
      );
    } else {
      // Document does not exist, create it
      await databases.createDocument(
        config.databaseId!,
        config.infoUserCollectionId!,
        'unique()', // Generate a unique ID for the new document
        {
          userId, // Include userId in the new document
          ...fieldsToUpdate
        }
      );
    }
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
  
  export async function getLatestProperties() {
    try {
      const result = await databases.listDocuments(
        config.databaseId!,
        config.propertiesCollectionId!,
        [Query.orderAsc("$createdAt"), Query.limit(5)]
      );
  
      return result.documents;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  export async function getProperties({
    filter,
    query,
    limit,
  }: {  
    filter: string;
    query: string;
    limit?: number;
  }) {
    try {
      const buildQuery = [Query.orderDesc("$createdAt")];
  
      if (filter && filter !== "All")
        buildQuery.push(Query.equal("type", filter));
  
      if (query)
        buildQuery.push(
          Query.or([
            Query.search("name", query),
            Query.search("address", query),
            Query.search("type", query),
          ])
        );
  
      if (limit) buildQuery.push(Query.limit(limit));
  
      const result = await databases.listDocuments(
        config.databaseId!,
        config.propertiesCollectionId!,
        buildQuery
      );
  
      return result.documents;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // write function to get property by id
  export async function getPropertyById({ id }: { id: string }) {
    try {
      const result = await databases.getDocument(
        config.databaseId!,
        config.propertiesCollectionId!,
        id
      );
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }


  export const updateChildAttribute = async (
    parentId: string,
    childId: string | null, // Pass null if creating a new child
    childAttributes: { [key: string]: any }
  ) => {
    try {
      // Check if the child exists
      let childDocument;
      if (childId) {
        const childDocuments = await databases.listDocuments(
          config.databaseId!,
          config.childrenCollectionId!,
          [Query.equal('childId', childId)]
        );
  
        if (childDocuments.documents.length > 0) {
          childDocument = childDocuments.documents[0];
        }
      }
  
      if (childDocument) {
        // Update existing child
        await databases.updateDocument(
          config.databaseId!,
          config.childrenCollectionId!,
          childDocument.$id,
          childAttributes
        );
        childId = childDocument.$id; // Ensure we have the correct child ID
      } else {
        // Create new child document
        const newChild = await databases.createDocument(
          config.databaseId!,
          config.childrenCollectionId!,
          'unique()',
          {
            parentId,
            ...childAttributes,
          }
        );
        childId = newChild.$id; // Assign new child ID
      }
  
      // Now update the parent's children array
      const parentDocuments = await databases.listDocuments(
        config.databaseId!,
        config.infoUserCollectionId!,
        [Query.equal('userId', parentId)]
      );
  
      if (parentDocuments.documents.length > 0) {
        const parentDocument = parentDocuments.documents[0];
  
        // Ensure children array exists
        let childrenArray = parentDocument.children || [];
  
        // Add the child ID if it's not already in the array
        if (!childrenArray.includes(childId)) {
          childrenArray.push(childId);
  
          await databases.updateDocument(
            config.databaseId!,
            config.infoUserCollectionId!,
            parentDocument.$id,
            { children: childrenArray }
          );
        }
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
  

  export async function uploadAvatar(avatar: string | { uri: string, type: string, name: string }) {
    try {
      console.log("Uploading avatar:", avatar);
      
      let blob: Blob;
      let fileName: string;
      let fileType: string;
      let fileUri: string;

      // Handle local file object
      if (typeof avatar === 'object' && avatar.uri) {
        // For local files, uri is a file path
        const response = await fetch(avatar.uri);
        if (!response.ok) {
          throw new Error(`Failed to read local file: ${avatar.uri}`);
        }
        blob = await response.blob();
        fileName = avatar.name || "avatar.png";
        fileType = avatar.type || "image/png";
        fileUri = avatar.uri;
      }
      // Handle URI string
      else if (typeof avatar === 'string') {
        // Validate URI format
        try {
          new URL(avatar);
        } catch (e) {
          throw new Error(`Invalid avatar URI format: ${avatar}`);
        }

        // Check network connectivity
        const networkStatus = await fetch('https://www.google.com', { method: 'HEAD' });
        if (!networkStatus.ok) {
          throw new Error("No network connection");
        }

        // Verify URI accessibility
        const avatarFile = await fetch(avatar);
        if (!avatarFile.ok) {
          throw new Error(`Failed to fetch avatar file from URI: ${avatar}. Status: ${avatarFile.status}`);
        }

        // Check content type
        const contentType = avatarFile.headers.get('content-type');
        if (!contentType?.startsWith('image/')) {
          throw new Error(`Invalid avatar content type: ${contentType}. Expected an image file`);
        }

        blob = await avatarFile.blob();
        fileName = avatar.split('/').pop() || "avatar.png";
        fileType = blob.type || "image/png";
        fileUri = avatar;
      }
      else {
        throw new Error("Invalid avatar input: must be either a URI string or file object");
      }

      console.log("Blob created:", blob);

      const fileSize = blob.size;
      
      console.log("File Metadata:", {
        fileName,
        fileType,
        fileSize,
        fileUri
      });

      // Create the file object with required metadata
      const fileData = {
        name: fileName,
        type: fileType,
        size: fileSize,
        uri: fileUri
      };

  
    // Upload the avatar to Appwrite storage
const file = await storage.createFile(
      config.storageProjectId!,  // Bucket ID
      ID.unique(),  // Unique file ID
      fileData
    );

    console.log('Avatar uploaded successfully:', file);

    // Return the file's ID to store in the user's avatar field
    return file.$id;
  } catch (error) {
    console.error('Error uploading avatar:', {
      error,
      timestamp: new Date().toISOString()
    });
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Avatar upload failed: ${errorMessage}. Please ensure you're using a valid image URL and try again.`);


  }
}



// collection get all the attribute of user 
export const getParentAndChildAttributesByUserId = async (userId : string) => {
  try {
    // Step 1: Fetch the parent document
    const parentDocuments = await databases.listDocuments(
      config.databaseId!,
      config.infoUserCollectionId!,
      [Query.equal('userId', userId)]
    );

    if (parentDocuments.documents.length === 0) {
      throw new Error(`No parent document found for userId: ${userId}`);
    }

    const parentDocument = parentDocuments.documents[0];

    // Step 2: Extract children IDs from the parent's document
    const childrenIds = parentDocument.children || [];

    // Step 3: Fetch all child documents by their IDs
    const childrenData = childrenIds.length > 0
      ? await Promise.all(
          childrenIds.map((childId : string) =>
            databases.getDocument(
              config.databaseId!,
              config.childrenCollectionId!,
              childId
            )
          )
        )
      : [];

    // Step 4: Combine parent data with children data
    return {
      parent: parentDocument,
      children: childrenData,
    };
  } catch (error) {
    console.error(`Error fetching parent and child attributes: ${error}`);
    return { parent: null, children: [] };
  }
};
